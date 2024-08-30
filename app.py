from fasthtml.common import fast_app, Div, P, serve

app, rt = fast_app()

@rt('/')
def get_home() -> Div:
    return Div(P('Hello World!'), hx_get="/change")

@rt('/change')
def get_change() -> P:
    return P('Nice to be here!')

serve()