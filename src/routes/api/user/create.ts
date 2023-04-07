import { APIEvent, json } from "solid-start/api";
import supabaseService from "~/supabase/serverClient";

export async function POST({ request }: APIEvent) {
  const jsonRequest = await request.json();
  try {
    const { error } = await supabaseService
      .from("users")
      .insert([
        {
          id: jsonRequest.id,
          name: jsonRequest.name,
        },
      ]);
    if (error) throw error;
    return json({ message: "Successfully created user profile" });
  } catch (error) {
    return json({ error: error });
  }
}
