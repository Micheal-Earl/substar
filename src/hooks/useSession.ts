import { Session } from "@supabase/supabase-js";
import { createResource, ResourceReturn } from "solid-js";
import supabaseAnon from "~/supabase/browserClient";

const [session, { refetch }] = createResource(fetchSession);

async function fetchSession() {
  try {
    const { data, error } = await supabaseAnon.auth.getSession();
    if (error) throw error;
    if (data.session) return data.session;
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const useSession = () =>
  [session, { refetch }] as ResourceReturn<Session | null>;
