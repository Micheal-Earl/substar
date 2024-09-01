from app import app
from pages.home import home_page
from pages.test import test_page
from components.base import base_comp
from components.change import change_comp

def build() -> None:
    app.add_route('/', home_page, ['GET'])
    app.add_route('/test', test_page, ['GET'])
    app.add_route('/base', base_comp, ['GET'])
    app.add_route('/change', change_comp, ['GET'])