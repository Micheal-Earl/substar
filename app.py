from fasthtml.common import FastHTML, Div, P, serve
from substar_supabase.client import create_supabase_client

app: FastHTML = FastHTML()

supabase_client = create_supabase_client()
print(supabase_client.table("users").select("*").execute())

@app.route('/', methods='get')
def home() -> Div:
    return Div(P('Hello World!'), hx_get="/change")

@app.route('/change', methods='get')
def change() -> P:
    return P('Nice to be here!')

serve()