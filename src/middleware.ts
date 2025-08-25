import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { requestContext, createRequestContext, generateRequestId, extractUserFromSupabaseUser } from './lib/request-context'

export async function middleware(request: NextRequest) {
  const requestId = generateRequestId();
  const context = createRequestContext(requestId, request);

  return requestContext.run(context, async () => {
    // Log request start
    requestContext.logRequestStart(request.method, request.nextUrl.pathname);

    let supabaseResponse = NextResponse.next({ request });
    let redirectResponse: NextResponse | null = null;

    try {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll();
            },
            setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
              try {
                cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                supabaseResponse = NextResponse.next({ request });
                cookiesToSet.forEach(({ name, value, options }) => {
                  supabaseResponse.cookies.set(name, value, options);
                });
              } catch {
                // The `set` method of `request.cookies` can throw an error on Next.js older versions.
                // If that happens, we ignore the error and fall back to the old way of setting cookies.
              }
            },
          },
        }
      );

      // IMPORTANT: No code between createServerClient and getUser() to prevent logout issues
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError) {
        requestContext.logError(userError, 'Failed to get user from Supabase');
      }

      // Update request context with user info if available
      if (user) {
        const userInfo = extractUserFromSupabaseUser(user);
        requestContext.set(userInfo);
        requestContext.logAuthEvent(`User authenticated: ${userInfo.userId} (${userInfo.userRole})`);
      }

      // Handle authentication-based redirects
      if (
        !user &&
        !request.nextUrl.pathname.startsWith('/login') &&
        !request.nextUrl.pathname.startsWith('/auth')
      ) {
        requestContext.logSecurityEvent('Unauthenticated access attempt, redirecting to login');
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        redirectResponse = NextResponse.redirect(url);
      } else if (user && request.nextUrl.pathname === '/login') {
        // Get fresh user data for role check
        const { data: { user: fullUser } } = await supabase.auth.getUser();
        const role = fullUser?.user_metadata?.role || 'teacher';
        const dashboardPath = role === 'admin' ? '/admin/dashboard' : '/teacher/dashboard';

        requestContext.logAuthEvent(`Redirecting authenticated user to ${dashboardPath}`);
        const url = request.nextUrl.clone();
        url.pathname = dashboardPath;
        redirectResponse = NextResponse.redirect(url);
      }

      // Log request completion
      const finalResponse = redirectResponse || supabaseResponse;
      requestContext.logRequestEnd(request.method, request.nextUrl.pathname, finalResponse.status);

      return finalResponse;

    } catch (error) {
      requestContext.logError(error as Error, 'Middleware execution failed');
      // Return the original response on error to avoid breaking the app
      requestContext.logRequestEnd(request.method, request.nextUrl.pathname, 500);
      return supabaseResponse;
    }
  });
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
