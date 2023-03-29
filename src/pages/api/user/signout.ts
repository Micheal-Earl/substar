import type { APIContext } from "astro";
import { removeAuthCookie } from "../../../supabase/session";

export async function get({ redirect }: APIContext): Promise<Response> {
  const cookie = removeAuthCookie();
  const response = redirect("/", 302);
  response.headers.set("Set-Cookie", cookie);
  return response;
}
