import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Create a new Supabase client using the anonymouse key.
 * @param {string} url The URL of the Supabase project.
 * @param {string} [anonKey] The anon key of the Supabase project.
 * @returns {SupabaseClient}
 */
const supabaseAnon: SupabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URI,
  import.meta.env.VITE_SUPABASE_ANON_URI,
);

export default supabaseAnon;
