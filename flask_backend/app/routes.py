from flask import Blueprint, jsonify
import pandas as pd
import matplotlib.pyplot as plt
import io
import base64
from .visualizations2 import Visualizations

visualizations_routes = Blueprint('visualizations', __name__)

@visualizations_routes.route('/generate_plots', methods=['GET'])
def generate_plots():
    plt.switch_backend('Agg')  # Use non-interactive mode

    data_path = '/Users/claudiapascual/CS178A_Project/course-project-bic/flask_backend/app/sub-1111_task-rest_run-1_desc-confounds_regressors.tsv'
    graphs = Visualizations(data_path)

    # Create plots and save to files
    plt.figure(figsize=(10, 5))
    graphs.plot_rotations()
    rotations_plot_path = 'rotations_plot.png'
    plt.savefig(rotations_plot_path)
    plt.close()

    plt.figure(figsize=(10, 5))
    graphs.plot_translations()
    translations_plot_path = 'translations_plot.png'
    plt.savefig(translations_plot_path)
    plt.close()

    plt.figure(figsize=(10, 5))
    graphs.plot_framewise()
    framewise_plot_path = 'framewise_plot.png'
    plt.savefig(framewise_plot_path)
    plt.close()

    # Convert plots to base64
    plots = {}
    for plot_name, plot_path in [('rotations', rotations_plot_path), ('translations', translations_plot_path), ('framewise', framewise_plot_path)]:
        with open(plot_path, 'rb') as plot_file:
            plot_base64 = base64.b64encode(plot_file.read()).decode('utf-8')
            plots[plot_name] = f'data:image/png;base64,{plot_base64}'

    return jsonify(plots)
