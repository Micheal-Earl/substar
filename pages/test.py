from fasthtml.common import Titled, Div, A

def test_page():
    return Div(
            Titled('A demo of fast_app()@'), 
            (A('link', href='/'))
        )