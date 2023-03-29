import type { APIContext } from "astro";

export async function get({ params, request }: APIContext): Promise<Response> {
  return new Response(
    JSON.stringify({ message: "Test success" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}
