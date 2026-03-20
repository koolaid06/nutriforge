import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  console.warn('Supabase env vars missing — running in offline mode')
}

export const supabase = (url && key)
  ? createClient(url, key, {
      auth: {
        // Keep session alive across browser closes (refresh token lasts 60 days)
        persistSession:    true,
        // Auto-refresh the access token before it expires
        autoRefreshToken:  true,
        // Detect the magic link token in the URL on redirect
        detectSessionInUrl: true,
        // Store session in localStorage (default, explicit for clarity)
        storage: window.localStorage,
      },
    })
  : null