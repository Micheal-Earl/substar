import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supabase/types/database";

/**
 * Create a new Supabase client using the service key.
 * @warning Do not expose the service key to the browser.
 * @param {string} url The URL of the Supabase project.
 * @param {string} [serviceKey] The service key of the Supabase project.
 * @returns {SupabaseClient}
 */
const supabaseService: SupabaseClient = createClient<Database>(
  import.meta.env.VITE_SUPABASE_PROJECT_URI,
  import.meta.env.VITE_SUPABASE_SECRET_URI,
);

export default supabaseService;
