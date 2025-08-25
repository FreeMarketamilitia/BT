/**
 * Supabase Client Configuration
 *
 * Required Environment Variables (set in Vercel dashboard):
 * - NEXT_PUBLIC_SUPABASE_URL: Your Supabase project URL (e.g., https://your-project.supabase.co)
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY: Your Supabase anonymous/public key
 *
 * To set in Vercel:
 * 1. Go to your Vercel project dashboard
 * 2. Navigate to Settings > Environment Variables
 * 3. Add the above variables with their values from your Supabase dashboard
 * 4. Redeploy your application
 */

import { createBrowserClient as createBrowserClientSupabase } from '@supabase/ssr'

export function createBrowserClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase environment variables. Please check your Vercel environment variables.')
  }
  return createBrowserClientSupabase(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

// Note: Server client is handled in middleware.ts for server-side operations
// Use createBrowserClient() for client-side operations only
