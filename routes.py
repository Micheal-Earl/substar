from app import app
from pages.home import home_page
from pages.test import test_page
from components.base import base_comp
from components.change import change_comp

def build_routes() -> None:
    #rt = app.route

    # def home_route():
    #     return home_page(base_comp(), change_comp())
    
    # @rt('/base', ['GET'])
    # def base_route():
    #     return base_comp()
    
    # @rt('/change', ['GET'])
    # def change_route():
    #     return change_comp()

    # app.route('/', ['GET'])(home_page)
    # app.route('/test', ['GET'])(test_page)
    # app.route('/base', ['GET'])(base_comp)
    # app.route('/change', ['GET'])(change_comp)
    
    app.add_route('/', home_page, ['GET'])
    app.add_route('/test', test_page, ['GET'])
    app.add_route('/base', base_comp, ['GET'])
    app.add_route('/change', change_comp, ['GET'])