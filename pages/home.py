from fasthtml.common import Div, Titled, Ul, Li
from components.base import base_comp
from components.change import change_comp

# *args, **kwargs
def home_page():
    # elements: list[Li] = []

    # for element in args:
    #     elements.append(Li(element))
        
    return Div(
                Titled("Main Page"),
                Ul(
                    Li(base_comp()),
                    Li(change_comp())
                )
                #Ul(*elements)
            )