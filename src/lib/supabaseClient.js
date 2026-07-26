import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const STORE_ID = process.env.NEXT_PUBLIC_STORE_ID;

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey && STORE_ID);

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
