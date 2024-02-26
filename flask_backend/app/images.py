from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import re
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

app = Flask(__name__)
CORS(app)

@app.route('/api/subjects')
def get_subjects():
    base_path = '/home/blore005/data/derivatives'
    
    # Filter out only directories starting with "sub-"
    subjects = sorted([entry for entry in os.listdir(base_path) if os.path.isdir(os.path.join(base_path, entry)) and entry.startswith('sub-')])

    return jsonify({'subjects': subjects})

@app.route('/api/figures')
def get_figures():
    base_path = '/home/blore005/data/derivatives/sub-01/figures'  # Adjust the path to your figures directory
    
    # Filter out only files with specific criteria (e.g., end with ".svg")
    figures = [entry for entry in os.listdir(base_path) if os.path.isfile(os.path.join(base_path, entry)) and entry.endswith('.svg')]

    # Process each figure filename to extract name and task
    processed_combinations = set()
    processed_figures = []
    for figure in figures:
        parts = figure.split('_')
        if 'task-' in parts[1]:
            task = parts[1]
            name = f"{parts[3]}_{parts[4]}".replace('.svg', '')
            fullName = f"{parts[1]}_{parts[3]}".replace('.svg', '')
            
        else:
            task = 'other'
            name = '_'.join(parts[1:]).replace('.svg', '')
            fullName = '_'.join(parts[1:]).replace('.svg', '')
        
        combination = (name, task)
        if combination not in processed_combinations:
            processed_combinations.add(combination)
            processed_figures.append({'fullName': fullName, 'name': name, 'task': task})

    # Sort the processed figures alphabetically by name
    sorted_figures = sorted(processed_figures, key=lambda x: x['name'])

    return jsonify({'figures': sorted_figures})

@app.route('/plot_info')
def get_tsv_files():
    base_path = '/home/blore005/data/derivatives/sub-01/func'  # Adjust the path to your TSV files directory
    
    # Filter out only files with specific criteria (e.g., end with ".tsv")
    tsv_files = [entry for entry in os.listdir(base_path) if os.path.isfile(os.path.join(base_path, entry)) and entry.endswith('.tsv')]
    
    # Process each TSV file filename to extract task_name and run
    processed_files = []
    for tsv_file in tsv_files:
        # Split the filename by '_' and extract task_name from part 1 and run from part 2
        parts = os.path.splitext(tsv_file)[0].split('_')
        task_name = parts[1] if len(parts) >= 2 else ''  # Extract task_name from part 1
        run = parts[2] if len(parts) >= 3 else ''       # Extract run from part 2
        processed_files.append({'task_name': task_name, 'run': run})

    # Sort the processed files alphabetically by task_name and run
    sorted_files = sorted(processed_files, key=lambda x: (x['task_name'], x['run']))

    return jsonify({'tsv_files': sorted_files})

@app.route('/get_images', methods=['GET'])
def get_images():
    task_name = request.args.get('task_name')

    # Path to the directory containing all subject folders 
    base_path = '/home/blore005/data/derivatives/'

    # List to store file paths
    image_paths = []
    # content_type = 'image/svg+xml'

    # Iterate through each subject folder
    for sub_folder in os.listdir(base_path):
        sub_path = os.path.join(base_path, sub_folder, 'figures')

        if os.path.isdir(sub_path):
            if '_' in task_name:
                # Split the task name to extract the first part
                first_part = task_name.split('_')[0]

                # Regular expression pattern for the task_name
                task_pattern = re.compile(f'{sub_folder}_{first_part}(_?.*{task_name.split("_", 1)[1]})?.svg')

                for filename in os.listdir(sub_path):
                    # Check if the filename matches the specified task_name using regular expressions
                    if task_pattern.match(filename):
                        file_path = os.path.join(sub_path, filename)
                        # image_paths.append(file_path)
                        image_paths.append(os.path.join(sub_folder, 'figures', filename))

            else:
                for filename in os.listdir(sub_path):
                    # Check if the filename matches the specified task_name using regular expressions
                    if re.match(f'{sub_folder}_{task_name}.*\.svg$', filename):
                        file_path = os.path.join(sub_path, filename)
                        # image_paths.append(file_path)
                        image_paths.append(os.path.join(sub_folder, 'figures', filename))


    # Sort the image paths based on filenames
    image_paths.sort()

    # Return the JSON response with image paths and Content-Type header
    return jsonify({'image_paths': image_paths})

@app.route('/svg_paths')
def get_svg_paths():
    base_path = '/home/blore005/data/derivatives'  # Base path of the dataset
    subject_folder = request.args.get('subject_folder')  # Get subject folder name from query parameters
    
    svg_paths = []  # List to store paths of SVG files
    
    if subject_folder:
        subject_path = os.path.join(base_path, subject_folder)
        
        # Check if the specified subject folder exists and starts with "sub-"
        if os.path.isdir(subject_path) and subject_folder.startswith('sub-'):
            figures_path = os.path.join(subject_path, 'figures')
            
            # Check if the "figures" directory exists within the specified subject folder
            if os.path.isdir(figures_path):
                # Append paths of SVG files within the "figures" directory
                # svg_paths.extend([os.path.join(figures_path, file) for file in os.listdir(figures_path) if file.endswith('.svg')])
                svg_paths.extend([
                    os.path.join(subject_folder, 'figures', file) 
                    for file in os.listdir(figures_path) if file.endswith('.svg')
                ])

    #Sort the image paths based on filenames
    svg_paths.sort()
    
    return jsonify({'svg_paths': svg_paths})
@app.route('/api/generate_plots', methods=['GET'])
def generate_plots():
    base_path = '/home/blore005/data/derivatives'  # Adjust the base path accordingly
    output_path = '/home/blore005/data/derivatives/plots'  # Adjust the output path

    # Create output directory if it doesn't exist
    if not os.path.exists(output_path):
        os.makedirs(output_path)

    plots_paths = {}

    for subject_folder in os.listdir(base_path):
        subject_folder_path = os.path.join(base_path, subject_folder)
        if os.path.isdir(subject_folder_path):
            func_folder_path = os.path.join(subject_folder_path, 'func')
            if os.path.exists(func_folder_path):
                for file_name in os.listdir(func_folder_path):
                    if file_name.endswith('.tsv'):
                        # Regular expression pattern to extract subject number and run number
                        pattern = r'sub-(\d+)_task-\w+_run-(\d+)_desc'
                        # extract subject number and run number
                        match = re.search(pattern, file_name)
                        if match:
                            subject_number = match.group(1)
                            run_number = match.group(2)

                        tsv_path = os.path.join(func_folder_path, file_name)
                        df = pd.read_csv(tsv_path, delimiter='\t')

                        # Rotation Plot
                        rotation_plot_filename = f'rotation_plot_{file_name[:-4]}.png'
                        rotation_plot_path = os.path.join(output_path, rotation_plot_filename)
                        if os.path.exists(rotation_plot_path):
                            os.remove(rotation_plot_path)
                        plt.figure()
                        sns.lineplot(data=df[['rot_x', 'rot_y', 'rot_z']])
                        plt.title(f'Subject {subject_number} - Run {run_number} Rotation Plot')
                        plt.xlabel('Time')
                        plt.ylabel('Rotation')
                        plt.savefig(rotation_plot_path)
                        plt.close()
                        plots_paths[f'rotation_plot_{file_name[:-4]}'] = rotation_plot_path

                        # Translation Plot
                        translation_plot_filename = f'translation_plot_{file_name[:-4]}.png'
                        translation_plot_path = os.path.join(output_path, translation_plot_filename)
                        if os.path.exists(translation_plot_path):
                            os.remove(translation_plot_path)
                        plt.figure()
                        sns.lineplot(data=df[['trans_x', 'trans_y', 'trans_z']])
                        plt.title(f'Subject {subject_number} - Run {run_number} Translation Plot')
                        plt.xlabel('Time')
                        plt.ylabel('Translation')
                        plt.savefig(translation_plot_path)
                        plt.close()
                        plots_paths[f'translation_plot_{file_name[:-4]}'] = translation_plot_path

                        # Framewise Displacement Plot
                        fd_plot_filename = f'fd_plot_{file_name[:-4]}.png'
                        fd_plot_path = os.path.join(output_path, fd_plot_filename)
                        if os.path.exists(fd_plot_path):
                            os.remove(fd_plot_path)
                        plt.figure()
                        sns.lineplot(data=df['framewise_displacement'])
                        plt.title(f'Subject {subject_number} - Run {run_number} Framewise Displacement Plot')
                        plt.xlabel('Time')
                        plt.ylabel('Framewise Displacement')
                        plt.savefig(fd_plot_path)
                        plt.close()
                        plots_paths[f'fd_plot_{file_name[:-4]}'] = fd_plot_path

    return jsonify({'plots_paths': plots_paths})

# @app.route('/get_plots/<plot_type>')
# def get_plots_by_type(plot_type):
#     plot_type = plot_type.lower()  # Convert plot type to lowercase

#     plots_directory = '/home/blore005/data/derivatives/plots'

#     # List to store paths of matching plot files
#     matching_plots = []

#     # Recursively traverse the directory structure
#     for root, dirs, files in os.walk(plots_directory):
#         for file in files:
#             if file.endswith('.png'):
#                 file_lowercase = file.lower()  # Convert filename to lowercase
#                 if plot_type == 'displacement' and 'fd' in file_lowercase:
#                     # Construct the full path to the plot file
#                     plot_path = os.path.join(root, file)
#                     # Append the path to the list
#                     matching_plots.append(plot_path)
#                 elif plot_type != 'displacement' and plot_type in file_lowercase:
#                     # Construct the full path to the plot file
#                     plot_path = os.path.join(root, file)
#                     # Append the path to the list
#                     matching_plots.append(plot_path)

#     # Sort the matching plot paths alphabetically
#     matching_plots = sorted(matching_plots)

#     plots_paths = [path.replace('/home/blore005/data/derivatives/', '') for path in matching_plots]

#     # Serve the matching plot files to the client
#     return jsonify({'plots_paths': plots_paths})

@app.route('/get_plots/<plot_type>')
def get_plots_by_type(plot_type):
    plot_type = plot_type.lower()  # Convert plot type to lowercase

    plots_directory = '/home/blore005/data/derivatives/plots'

    # List to store paths of matching plot files
    matching_plots = []

    # Recursively traverse the directory structure
    for root, dirs, files in os.walk(plots_directory):
        for file in files:
            if file.endswith('.png'):
                file_lowercase = file.lower()  # Convert filename to lowercase
                if plot_type == 'displacement' and 'fd' in file_lowercase:
                    # Construct the full path to the plot file
                    plot_path = os.path.join(root, file)
                    # Append the path to the list as a dictionary
                    matching_plots.append({'path': plot_path})
                elif plot_type != 'displacement' and plot_type in file_lowercase:
                    # Construct the full path to the plot file
                    plot_path = os.path.join(root, file)
                    # Append the path to the list as a dictionary
                    matching_plots.append({'path': plot_path})

    # Sort the matching plot paths alphabetically
    matching_plots = sorted(matching_plots, key=lambda x: x['path'])

    matching_plots = [path['path'].replace('/home/blore005/data/derivatives/', '') for path in matching_plots]

    # Extract subject, task, and run from plot file names
    for i, plot in enumerate(matching_plots):
        file_name = os.path.basename(plot)
        parts = file_name.split('_')
        if len(parts) >= 4:
            subject = parts[2]
            task = parts[3]
            run = parts[4]
            matching_plots[i] = {'path': plot, 'subject': subject, 'task': task, 'run': run}

    # Serve the matching plot files to the client
    return jsonify({'plots_paths': matching_plots})

if __name__ == '__main__':
    app.run(debug=True)