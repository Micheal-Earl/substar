import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

const supabase: SupabaseClient = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URI,
  import.meta.env.VITE_SUPABASE_ANON_URI,
);

export default supabase;
