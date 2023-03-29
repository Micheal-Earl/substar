import type { AuthResponse } from "@supabase/supabase-js";
import type { APIContext } from "astro";
import supabase from "../../../supabase/client";
import { setAuthCookie } from "../../../supabase/session";

export async function post(
  { request, redirect }: APIContext,
): Promise<Response> {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const { data: signInData, error }: AuthResponse = await supabase.auth
    .signInWithPassword({
      email: email as string,
      password: password as string,
    });

  if (error) {
    return new Response(
      JSON.stringify({ error: error }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  console.log(signInData.session);

  if (signInData.session) {
    const { accessCookie, refreshCookie, error } = await setAuthCookie(
      signInData.session,
    );

    if (error) return redirect("/", 303);

    const response = redirect("/", 303);
    response.headers.set(
      "Set-Cookie",
      [accessCookie, refreshCookie].filter(Boolean).join("; "),
    );
    return response;
  }

  return new Response(
    JSON.stringify({ error: "Session not found" }),
    {
      status: 500,
      headers: { "Content-Type": "application/json" },
    },
  );
}
