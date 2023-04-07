import { APIEvent, json } from "solid-start/api";

export async function POST({ request }: APIEvent) {
  const jsonRequest = await request.json();
  return json(jsonRequest);
}
