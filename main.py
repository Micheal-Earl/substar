from fasthtml.common import serve
from app import app
#from substar_supabase.client import create_supabase_client
import routes

routes.build_routes()
print("Routes built", app.routes)


#supabase_client = create_supabase_client()
#print(supabase_client.table("users").select("*").execute())

serve()
