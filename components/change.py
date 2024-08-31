from fasthtml.common import Div, P

def change_comp():
    return Div(P('Nice to be here!'), hx_get='/base', hx_swap='outerHTML')