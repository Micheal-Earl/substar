import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

const supabase: SupabaseClient = createClient(
  import.meta.env.SUPABASE_PROJECT_URI,
  import.meta.env.SUPABASE_ANON_URI,
);

export default supabase;
