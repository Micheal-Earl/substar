import { APIEvent } from "solid-start/api";

export async function GET({ params }: APIEvent) {
  const id = params.id;
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  return res;
}
