'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { createBrowserClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export function UnifiedLoginForm() {
  const [activeTab, setActiveTab] = useState('sso');

  // Sign in form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSignInLoading, setIsSignInLoading] = useState(false);
  const [signInError, setSignInError] = useState('');
  const [signInSuccess, setSignInSuccess] = useState('');

  // Magic link state
  const [magicEmail, setMagicEmail] = useState('');
  const [isMagicLoading, setIsMagicLoading] = useState(false);
  const [magicError, setMagicError] = useState('');
  const [magicSuccess, setMagicSuccess] = useState('');
  const [magicSubmitted, setMagicSubmitted] = useState(false);

  const router = useRouter();

  const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  });

  const magicLinkSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSignInLoading(true);
    setSignInError('');
    setSignInSuccess('');

    try {
      const data = { email, password };
      const parsed = loginSchema.safeParse(data);
      if (!parsed.success) {
        setSignInError(parsed.error.issues[0].message);
        return;
      }

      const supabase = createBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
      });

      if (error) {
        setSignInError('Invalid credentials. Please check your email and password.');
        console.error('Login failed:', error.message);
      } else {
        setSignInSuccess('Login successful! Redirecting...');
        // Redirect will be handled by middleware based on user role
        router.push('/dashboard');
      }
    } catch (err) {
      setSignInError('An error occurred. Please try again.');
    } finally {
      setIsSignInLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsMagicLoading(true);
    setMagicError('');
    setMagicSuccess('');

    try {
      const data = { email: magicEmail };
      const parsed = magicLinkSchema.safeParse(data);
      if (!parsed.success) {
        setMagicError(parsed.error.issues[0].message);
        return;
      }

      const supabase = createBrowserClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: parsed.data.email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setMagicError('Failed to send magic link. Please try again.');
        console.error('Magic link failed:', error.message);
      } else {
        setMagicSuccess('Magic link sent! Check your email to log in instantly.');
        setMagicSubmitted(true);
      }
    } catch (err) {
      setMagicError('An error occurred. Please try again.');
    } finally {
      setIsMagicLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Placeholder for Google OAuth - UI only
    console.log('Google login clicked');
    // In a real implementation, this would trigger OAuth flow
  };

  const handleMicrosoftLogin = () => {
    // Placeholder for Microsoft OAuth - UI only
    console.log('Microsoft login clicked');
    // In a real implementation, this would trigger OAuth flow
  };

  const resetMagicLink = () => {
    setMagicSubmitted(false);
    setMagicSuccess('');
    setMagicEmail('');
    setMagicError('');
  };

  return (
    <div className="w-full space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="magic">Magic Link</TabsTrigger>
          <TabsTrigger value="sso">SSO</TabsTrigger>
        </TabsList>

        <TabsContent value="signin" className="space-y-4">
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signin-email">Email</Label>
              <Input
                id="signin-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSignInLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signin-password">Password</Label>
              <Input
                id="signin-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isSignInLoading}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  disabled={isSignInLoading}
                />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Remember me
                </Label>
              </div>

              <Button variant="link" className="text-sm p-0 h-auto" asChild>
                <a href="#forgot-password">Forgot password?</a>
              </Button>
            </div>

            <Button type="submit" className="w-full" disabled={isSignInLoading}>
              {isSignInLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>

          {signInError && (
            <Alert variant="destructive">
              <AlertDescription>{signInError}</AlertDescription>
            </Alert>
          )}

          {signInSuccess && (
            <Alert>
              <AlertDescription>{signInSuccess}</AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="magic" className="space-y-4">
          {magicSubmitted ? (
            <div className="space-y-4 text-center">
              <Alert>
                <AlertDescription>
                  {magicSuccess}
                </AlertDescription>
              </Alert>
              <Button
                variant="outline"
                onClick={resetMagicLink}
                className="w-full"
              >
                Send another link
              </Button>
            </div>
          ) : (
            <form onSubmit={handleMagicLink} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="magic-email">Email</Label>
                <Input
                  id="magic-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={magicEmail}
                  onChange={(e) => setMagicEmail(e.target.value)}
                  required
                  disabled={isMagicLoading}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isMagicLoading}>
                {isMagicLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Magic Link
              </Button>
            </form>
          )}

          {magicError && (
            <Alert variant="destructive">
              <AlertDescription>{magicError}</AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="sso" className="space-y-6">
          <div className="space-y-4">
            <Button
              variant="outline"
              onClick={handleGoogleLogin}
              className="w-full"
              type="button"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <Button
              variant="outline"
              onClick={handleMicrosoftLogin}
              className="w-full"
              type="button"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path fill="#F25022" d="M1 1h10v10H1z" />
                <path fill="#00A4EF" d="M12 1h10v10H12z" />
                <path fill="#7FBA00" d="M1 12h10v10H1z" />
                <path fill="#FFB900" d="M12 12h10v10H12z" />
              </svg>
              Continue with Microsoft
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or use email instead
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={() => setActiveTab('signin')}
            className="w-full"
          >
            Sign in with email and password
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
