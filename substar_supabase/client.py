from dotenv import dotenv_values
from supabase import create_client, Client

env: dict[str, str | None] = dotenv_values(".env")

url: str = env["SUPABASE_URL"]
key: str = env["SUPABASE_KEY"]

def create():
    supabase_client: Client = create_client(url, key)
    return supabase_client