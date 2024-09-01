from fasthtml.common import serve
from app import app
import logger
import routes
#import substar-supabase.client as client

routes.build()
logger.print_routes(app.routes)

#supabase_client = client.create()
#print(supabase_client.table("users").select("*").execute())

serve()
