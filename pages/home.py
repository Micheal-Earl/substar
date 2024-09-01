from fasthtml.common import Div, Ul, Li, A, Nav, Span, Img, H1
from components.base import base_comp
from components.change import change_comp

# *args, **kwargs
def home_page():
    # elements: list[Li] = []

    # for element in args:
    #     elements.append(Li(element))
        
    return Div(
                H1("Main Page"),
                Nav(Span()),
                Ul(
                    Li(base_comp()),
                    Li(change_comp()),
                    Li(A('link', href='/test'))
                ),
                Img(src='/assets/pic.png', alt="discord")
                #Ul(*elements)
            )