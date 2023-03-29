import supabase from "../../../supabase/client";
import type { AuthResponse } from "@supabase/supabase-js";
import type { APIContext, APIRoute } from "astro";

export async function get({ params, request }: APIContext): Promise<Response> {
  return new Response(
    JSON.stringify({ data: request?.method }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}

export async function post({ params, request }: APIContext): Promise<Response> {
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    const { data: signInData }: AuthResponse = await supabase.auth
      .signInWithPassword({
        email: email as string,
        password: password as string,
      });

    console.log(signInData);

    return new Response(
      JSON.stringify({ data: signInData }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ error: error }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  } finally {
    return new Response();
  }
}
