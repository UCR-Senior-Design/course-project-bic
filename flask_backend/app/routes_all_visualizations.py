from flask import Blueprint, jsonify, request
import os
import pandas as pd
import matplotlib.pyplot as plt
import io
import base64
from .visualizations2 import Visualizations

visualizations_routes = Blueprint('visualizations', __name__)

@visualizations_routes.route('/plotter', methods=['POST'])
def generate_plots():
    plt.switch_backend('Agg')  # Use non-interactive mode

    # Get the selected file from the request
    selected_file = request.json.get('selectedFile')

    # Assuming the data folder is 'data' within your project directory
    data_folder = os.path.join(os.path.dirname(__file__), 'data')

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
        plot_path = f'{plot_name}_plot.png'
        plt.savefig(plot_path)
        plt.close()

        # Convert plots to base64
        with open(plot_path, 'rb') as plot_file:
            plot_base64 = base64.b64encode(plot_file.read()).decode('utf-8')
            plots[plot_name] = f'data:image/png;base64,{plot_base64}'

        # Delete the temporary plot file
        os.remove(plot_path)

    return jsonify(plots)
