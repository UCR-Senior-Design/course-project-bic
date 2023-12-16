# /flask_backend/app/__init__.py

from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__, static_url_path='/static', static_folder='static')
    CORS(app)

    # Import and register blueprints
    from .routes import visualizations_routes
    app.register_blueprint(visualizations_routes, url_prefix='/visualizations')
    
    #from .routes import file_routes
    #app.register_blueprint(file_routes, url_prefix='/files')

    return app