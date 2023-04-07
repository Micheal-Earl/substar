import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Create a new Supabase client using the service key.
 * DANGER: Do not expose the service key to the browser.
 * @param {string} url The URL of the Supabase project.
 * @param {string} [serviceKey] The anon key of the Supabase project.
 * @returns {SupabaseClient}
 */
const supabaseService: SupabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URI,
  import.meta.env.VITE_SUPABASE_SECRET_URI,
);

export default supabaseService;
