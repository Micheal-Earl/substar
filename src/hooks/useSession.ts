import { Session } from "@supabase/supabase-js";
import { createResource, ResourceReturn } from "solid-js";
import supabase from "~/supabase/client";

const [session, { refetch }] = createResource(fetchSession);

async function fetchSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
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
