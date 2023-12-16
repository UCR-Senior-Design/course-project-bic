from flask import Blueprint, jsonify, request
import pandas as pd
import matplotlib.pyplot as plt
import io
import base64
from .visualizations2 import Visualizations
import os

visualizations_routes = Blueprint('visualizations', __name__)

@visualizations_routes.route('/list_files', methods=['GET'])
def list_files():
    data_folder = os.path.join(os.path.dirname(__file__), '/Users/claudiapascual/CS178A_Project/course-project-bic/flask_backend/app/data')
    files = [f for f in os.listdir(data_folder) if f.endswith('.tsv')]
    return jsonify({'files': files})

@visualizations_routes.route('/generate_plots', methods=['GET'])
def generate_plots():
    plt.switch_backend('Agg')  # Use non-interactive mode

<<<<<<< HEAD
    data_path = '/Users/claudiapascual/tester/course-project-bic/flask_backend/app/sub-01_task-commpre_run-01_desc-confounds_timeseries.tsv'
=======
    data_path = '/Users/claudiapascual/CS178A_Project/course-project-bic/flask_backend/app/sub-01_task-commpre_run-01_desc-confounds_timeseries.tsv'
>>>>>>> 368829441b0ff24df615780319458f1adfc4d194
    graphs = Visualizations(data_path)

    # Create plots and save to files
    plt.figure(figsize=(10, 5))
    graphs.plot_rotations()
    rotations_plot_path = '/Users/claudiapascual/CS178A_Project/course-project-bic/flask_backend/app/static/images/rotations_plot.png'
    plt.savefig(rotations_plot_path)
    plt.close()

    plt.figure(figsize=(10, 5))
    graphs.plot_translations()
    translations_plot_path = '/Users/claudiapascual/CS178A_Project/course-project-bic/flask_backend/app/static/images/translations_plot.png'
    plt.savefig(translations_plot_path)
    plt.close()

    plt.figure(figsize=(10, 5))
    graphs.plot_framewise()
    framewise_plot_path = '/Users/claudiapascual/CS178A_Project/course-project-bic/flask_backend/app/static/images/framewise_plot.png'
    plt.savefig(framewise_plot_path)
    plt.close()

    # Convert plots to base64
    plots = {}
    for plot_name, plot_path in [('rotations', rotations_plot_path), ('translations', translations_plot_path), ('framewise', framewise_plot_path)]:
        with open(plot_path, 'rb') as plot_file:
            plot_base64 = base64.b64encode(plot_file.read()).decode('utf-8')
            plots[plot_name] = f'data:image/png;base64,{plot_base64}'

    return jsonify(plots)

@visualizations_routes.route('/plotter', methods=['POST'])
def plotter():
    plt.switch_backend('Agg')  # Use non-interactive mode

    # Get the selected file from the request
    selected_file = request.json.get('selectedFile')

    # Assuming the data folder is 'data' within your project directory
    data_folder = os.path.join(os.path.dirname(__file__), '/Users/claudiapascual/CS178A_Project/course-project-bic/flask_backend/app/data')

    # Construct the full path to the selected file
    data_path = os.path.join(data_folder, selected_file)

    # Check if the file exists
    if not os.path.exists(data_path):
        return jsonify({'error': 'File not found'}), 404

    # Create Visualizations instance
    graphs = Visualizations(data_path)

    # Create plots and save to files
    plots = {}
    for plot_name, plot_function in [('rotations', graphs.plot_rotations), ('translations', graphs.plot_translations), ('framewise', graphs.plot_framewise)]:
        plt.figure(figsize=(10, 5))
        plot_function()
        plot_path = f'/Users/claudiapascual/CS178A_Project/course-project-bic/flask_backend/app/image/{plot_name}_plot.png'  # Save in the static folder
        plt.savefig(os.path.join(os.path.dirname(__file__), plot_path))
        plt.close()

        # Convert plots to base64
        with open(os.path.join(os.path.dirname(__file__), plot_path), 'rb') as plot_file:
            plot_base64 = base64.b64encode(plot_file.read()).decode('utf-8')
            plots[plot_name] = f'data:image/png;base64,{plot_base64}'

        # Delete the temporary plot file
        os.remove(os.path.join(os.path.dirname(__file__), plot_path))

    return jsonify(plots)