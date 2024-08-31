from fasthtml.common import Div, P

def base_comp():
    return Div(P('Hello World!'), hx_get='/change', hx_swap='outerHTML')