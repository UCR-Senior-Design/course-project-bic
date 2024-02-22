from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import re

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
            name = parts[3].replace('.svg', '')
            fullName = f"{parts[1]}_{parts[3]}".replace('.svg', '')
            
        else:
            task = 'none'
            name = '_'.join(parts[1:]).replace('.svg', '')
            fullName = '_'.join(parts[1:]).replace('.svg', '')
        
        combination = (name, task)
        if combination not in processed_combinations:
            processed_combinations.add(combination)
            processed_figures.append({'fullName': fullName, 'name': name, 'task': task})

    # Sort the processed figures alphabetically by name
    sorted_figures = sorted(processed_figures, key=lambda x: x['name'])

    return jsonify({'figures': sorted_figures})

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

    # # return jsonify({'image_paths': image_paths})
    # # Set Content-Type header to 'image/svg+xml'
    # headers = {'Content-Type': 'image/svg+xml'}

    # Return the JSON response with image paths and Content-Type header
    return jsonify({'image_paths': image_paths})

# @app.route('/svg_paths')
# def get_svg_paths():
#     base_path = '/home/blore005/data/derivatives'  # Base path of the dataset
#     subject_folder = request.args.get('subject_folder')  # Get subject folder name from query parameters
    
#     svg_paths = []  # List to store paths of SVG files
    
#     if subject_folder:
#         subject_path = os.path.join(base_path, subject_folder)
        
#         # Check if the specified subject folder exists and starts with "sub-"
#         if os.path.isdir(subject_path) and subject_folder.startswith('sub-'):
#             figures_path = os.path.join(subject_path, 'figures')
            
#             # Check if the "figures" directory exists within the specified subject folder
#             if os.path.isdir(figures_path):
#                 # Append paths of SVG files within the "figures" directory
#                 # svg_paths.extend([os.path.join(figures_path, file) for file in os.listdir(figures_path) if file.endswith('.svg')])
#                 svg_paths.extend([
#                     os.path.join(subject_folder, 'figures', file) 
#                     for file in os.listdir(figures_path) if file.endswith('.svg')
#                 ])

#     #Sort the image paths based on filenames
#     svg_paths.sort()
    
#     return jsonify({'svg_paths': svg_paths})
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
                svg_paths.extend([
                    {
                        'path': os.path.join(subject_folder, 'figures', file),
                        'subject_number': subject_folder.split('_')[0].replace('sub-', ''),
                        'run_number': file.split('_')[3].split('-')[1],
                        'task_type': file.split('_')[2].split('-')[1],
                        'name': file.split('_')[4].split('-')[1].split('.')[0]
                    }
                    if file.startswith('sub-') and '_task-' in file and '_run-' in file and '_desc-' in file else
                    {
                        'path': os.path.join(subject_folder, 'figures', file),
                        'subject_number': subject_folder.split('_')[0].replace('sub-', ''),
                        'name': file.split('_')[2].split('.')[0]
                    }
                    for file in os.listdir(figures_path) if file.endswith('.svg')
                ])

    # Sort the image paths based on filenames
    svg_paths.sort(key=lambda x: x['path'])
    
    return jsonify({'svg_paths': svg_paths})


if __name__ == '__main__':
    app.run(debug=True)