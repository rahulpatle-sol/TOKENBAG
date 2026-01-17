import { createClient } from '@supabase/supabase-js';

// Ye values tujhe tere Supabase Project Settings > API se milengi
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing in .env file!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);