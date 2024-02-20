# main_routes.py
from flask import Blueprint

main_routes = Blueprint('main_routes', __name__)

@main_routes.route('/')
def index():
    return 'Welcome to the main routes!'
