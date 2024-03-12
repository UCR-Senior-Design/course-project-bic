from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import re
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import traceback
import shutil

app = Flask(__name__)
CORS(app)

# Define global variable for data path
base_path = None
@app.route('/set_data_path', methods=['POST'])
def set_data_path():
    data_path = request.json.get('data_path')  # Assuming JSON payload with 'data_path' key
    if data_path:
        # Check if the specified directory exists
        if os.path.exists(data_path):
            # Check if the specified directory contains any subject folders
            subjects = [entry for entry in os.listdir(data_path) if os.path.isdir(os.path.join(data_path, entry)) and entry.startswith('sub-')]
            if subjects:
                # Take the first subject found
                subject = subjects[0]
                subject_path = os.path.join(data_path, subject)
                # Check if the "figures" folder exists in the subject directory
                if os.path.exists(os.path.join(subject_path, 'figures')) and os.path.isdir(os.path.join(subject_path, 'figures')):                    
                    global base_path
                    base_path = data_path
                    return jsonify({'message': 'Data path set successfully'})
                else:
                    return jsonify({'error': '"figures" folder not found in the specified subject directory'}), 400
            else:
                return jsonify({'error': 'Path does not contain any subject folders.'}), 400
        else:
            return jsonify({'error': 'Specified directory does not exist'}), 400
    else:
        return jsonify({'error': 'Data path not provided'}), 400

@app.route('/api/subjects')
def get_subjects():
    global base_path  
    if base_path:
        # Filter out only directories starting with "sub-" 
        subjects = sorted([entry for entry in os.listdir(base_path) if os.path.isdir(os.path.join(base_path, entry)) and entry.startswith('sub-')])
        return jsonify({'subjects': subjects})
    else:
        return jsonify({'error': 'Data path not set.'}), 400

@app.route('/api/figures')
def get_figures():
    if base_path is None:
        return jsonify({'error': 'Data path is not set'}), 400

    # Get the list of directories within the base path
    all_directories = [entry for entry in os.listdir(base_path) if os.path.isdir(os.path.join(base_path, entry))]

    # Filter directories to find subject folders
    subject_folders = []
    for directory in all_directories:
        directory_path = os.path.join(base_path, directory)
        # Check if the directory contains certain required files or subdirectories
        if os.path.exists(os.path.join(directory_path, 'figures')):
            subject_folders.append(directory)

    if not subject_folders:
        return jsonify({'error': 'No subject folders found'}), 400

    # Select the first subject folder found
    subject_folder = subject_folders[0]

    # Construct the figures path using the selected subject folder
    figures_path = os.path.join(base_path, subject_folder, 'figures') 

    # Filter out only files that end with ".svg"
    figures = [entry for entry in os.listdir(figures_path) if os.path.isfile(os.path.join(figures_path, entry)) and entry.endswith('.svg')]

    # Process each figure filename to extract name and task
    processed_combinations = set()
    processed_figures = []
    for figure in figures:
        parts = figure.split('_')
        if 'task-' in parts[1]:
            task = parts[1]
            name = f"{parts[3]}_{parts[4]}".replace('.svg', '')
            fullName = f"{parts[1]}_{parts[3]}_{parts[4]}".replace('.svg', '')
            
        else:
            task = 'anatomical'
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
    if base_path is None:
        return jsonify({'error': 'Data path is not set'}), 400

    func_path = os.path.join(base_path, 'sub-01', 'func')  # Adjust as needed
    
    # Filter out only files with specific criteria (e.g., end with ".tsv")
    tsv_files = [entry for entry in os.listdir(func_path) if os.path.isfile(os.path.join(func_path, entry)) and entry.endswith('.tsv')]
    
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

    if base_path is None:
        return jsonify({'error': 'Data path is not set'}), 400

    # List to store file paths
    image_paths = []

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
                        image_paths.append(os.path.join(sub_folder, 'figures', filename))

            else:
                for filename in os.listdir(sub_path):
                    # Check if the filename matches the specified task_name using regular expressions
                    if re.match(f'{sub_folder}_{task_name}.*\.svg$', filename):
                        file_path = os.path.join(sub_path, filename)
                        image_paths.append(os.path.join(sub_folder, 'figures', filename))

    # Sort the image paths based on filenames
    image_paths.sort()

    # Return the JSON response with image paths
    return jsonify({'image_paths': image_paths})

@app.route('/svg_paths')
def get_svg_paths():
    subject_folder = request.args.get('subject_folder')  # Get subject folder name from query parameters
    
    if base_path is None:
        return jsonify({'error': 'Data path is not set'}), 400
    
    svg_paths = []  # List to store paths of SVG files
    
    if subject_folder:
        subject_path = os.path.join(base_path, subject_folder)
        
        # Check if the specified subject folder exists and starts with "sub-"
        if os.path.isdir(subject_path) and subject_folder.startswith('sub-'):
            figures_path = os.path.join(subject_path, 'figures')
            
            # Check if the "figures" directory exists within the specified subject folder
            if os.path.isdir(figures_path):
                # Append paths of SVG files within the "figures" directory

                for file in os.listdir(figures_path):
                    if file.endswith('.svg'):
                        task_type = file.split('_')[1].split('-')[1] if 'task-' in file else 'anatomical'

                        svg_paths.append({
                            'path': os.path.join(subject_folder, 'figures', file),
                            'task_type': task_type
                        })


    #Sort the image paths based on filenames

    svg_paths.sort(key=lambda x: x['path'])
    
    return jsonify({'svg_paths': svg_paths})

@app.route('/api/generate_plots', methods=['GET'])
def generate_plots():
    if base_path is None:
        return jsonify({'error': 'Data path is not set'}), 400

    output_path = os.path.join(base_path, 'plots')  # Adjust the output path based on base_path

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
                        # Expression pattern to extract subject number and run number
                        pattern = r'sub-(\d+)_task-\w+_run-(\d+)_desc'
                        # extract subject number and run number
                        match = re.search(pattern, file_name)
                        if match:
                            subject_number = match.group(1)

                        tsv_path = os.path.join(func_folder_path, file_name)
                        # df = pd.read_csv(tsv_path, delimiter='\t')
                        try:
                            df = pd.read_csv(tsv_path, delimiter='\t')
                        except Exception as e:
                            return jsonify({'error': f'Error reading file: {str(e)}'}), 500

                        # Rotation Plot
                        rotation_plot_filename = f'rotation_plot_{file_name[:-4]}.png'
                        rotation_plot_path = os.path.join(output_path, rotation_plot_filename)
                        if not os.path.exists(rotation_plot_path):
                            plt.figure()
                            sns.lineplot(data=df[['rot_x', 'rot_y', 'rot_z']])
                            plt.title(f'Subject {subject_number} Rotation Plot')
                            plt.xlabel('Time')
                            plt.ylabel('Rotation')
                            plt.savefig(rotation_plot_path)
                            plt.close()
                        plots_paths[f'rotation_plot_{file_name[:-4]}'] = rotation_plot_path

                        # Translation Plot
                        translation_plot_filename = f'translation_plot_{file_name[:-4]}.png'
                        translation_plot_path = os.path.join(output_path, translation_plot_filename)
                        if not os.path.exists(translation_plot_path):
                            plt.figure()
                            sns.lineplot(data=df[['trans_x', 'trans_y', 'trans_z']])
                            plt.title(f'Subject {subject_number} Translation Plot')
                            plt.xlabel('Time')
                            plt.ylabel('Translation')
                            plt.savefig(translation_plot_path)
                            plt.close()
                        plots_paths[f'translation_plot_{file_name[:-4]}'] = translation_plot_path

                        # Framewise Displacement Plot
                        fd_plot_filename = f'fd_plot_{file_name[:-4]}.png'
                        fd_plot_path = os.path.join(output_path, fd_plot_filename)
                        if not os.path.exists(fd_plot_path):
                            plt.figure()
                            sns.lineplot(data=df['framewise_displacement'])
                            plt.title(f'Subject {subject_number} Framewise Displacement Plot')
                            plt.xlabel('Time')
                            plt.ylabel('Framewise Displacement')
                            plt.savefig(fd_plot_path)
                            plt.close()
                        plots_paths[f'fd_plot_{file_name[:-4]}'] = fd_plot_path

    return jsonify({'plots_paths': plots_paths})

@app.route('/get_plots/<plot_type>')
def get_plots_by_type(plot_type):
    plot_type = plot_type.lower()  # Convert plot type to lowercase

    if base_path is None:
        return jsonify({'error': 'Data path is not set'}), 400

    plots_directory = os.path.join(base_path, 'plots')

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

    # Remove the base path prefix from plot paths
    matching_plots = [path['path'].replace(base_path, '') for path in matching_plots]

    # Extract subject, task, and run from plot file names
    for i, plot in enumerate(matching_plots):
        file_name = os.path.basename(plot)
        parts = file_name.split('_')
        if len(parts) >= 4:
            subject_parts = parts[2].split('-')
            if len(subject_parts) >= 2:
                subject = 'Subject ' + subject_parts[1]
            task = parts[3]
            run_parts = parts[4].split('-')
            if len(run_parts) >= 2:
                run = 'Run ' + run_parts[1]
            matching_plots[i] = {'path': plot, 'subject': subject, 'task': task, 'run': run}

    return jsonify({'plots_paths': matching_plots})



@app.route('/api/generate_spike_plots', methods=['GET'])
def generate_spike_plots():
    #base_path = '/home/blore005/data/derivatives'  # Adjust the base path accordingly
    if base_path is None:
        return jsonify({'error': 'Data path is not set'}), 400
        
    output_path = '/home/blore005/course-project-bic/flask_backend/app/static/plots'  # Adjust the output path

    # Create output directory if it doesn't exist
    if not os.path.exists(output_path):
        os.makedirs(output_path)

    plots_paths = {}

    # Define threshold and magnitude for spike detection
    threshold = 0.5  # Example threshold for spike detection
    magnitude = 1.0  # Example magnitude for spike visualization

    for subject_folder in os.listdir(base_path):
        subject_folder_path = os.path.join(base_path, subject_folder)
        if os.path.isdir(subject_folder_path):
            func_folder_path = os.path.join(subject_folder_path, 'func')
            if os.path.exists(func_folder_path):
                for file_name in os.listdir(func_folder_path):
                    if file_name.endswith('.tsv'):
                        pattern = r'sub-(\d+)_task-\w+_run-(\d+)_desc'
                        match = re.search(pattern, file_name)
                        if match:
                            subject_number = match.group(1)

                        tsv_path = os.path.join(func_folder_path, file_name)
                        df = pd.read_csv(tsv_path, delimiter='\t')

                        # Framewise Displacement Plot with Spike Highlighting
                        fd_plot_filename = f'fd_plot_{file_name[:-4]}.png'
                        fd_plot_path = os.path.join(output_path, fd_plot_filename)

                        # Remove existing plot file if it exists
                        if os.path.exists(fd_plot_path):
                            os.remove(fd_plot_path)
                        
                        plt.figure(figsize=(10, 6))
                        sns.lineplot(data=df['framewise_displacement'])

                        # Highlight spikes that exceed the threshold
                        spikes = df['framewise_displacement'] > threshold
                        plt.scatter(df.index[spikes], df['framewise_displacement'][spikes], label='Spikes', edgecolor='r', facecolor='none', s=magnitude*30, linewidths=2)

                        plt.title(f'Subject {subject_number} Framewise Displacement Plot')
                        plt.text(0.96, 0.90, f'Spikes: {spike_count}', horizontalalignment='right', verticalalignment='top', transform=plt.gca().transAxes, fontsize=10, bbox=dict(facecolor='white', alpha=0.5))
                        plt.xlabel('Time')
                        plt.ylabel('Framewise Displacement')
                        plt.legend()
                        plt.savefig(fd_plot_path)
                        plt.close()     
                       
                        plots_paths[f'fd_plot_{file_name[:-4]}'] = fd_plot_path

    return jsonify({'plots_paths': plots_paths})

@app.route('/get_filter_plots')
def get_all_plots():
    plots_directory = '/home/cpasc012/Project_Tester_CS178B/course-project-bic/flask_backend/app/static/plots'

    # List to store paths of all plot files
    all_plots = []

    # Recursively traverse the directory structure
    for root, dirs, files in os.walk(plots_directory):
        for file in files:
            if file.endswith('.png'):
                # Construct the full path to the plot file
                plot_path = os.path.join(root, file)
                # Append the path to the list as a dictionary
                all_plots.append({'path': plot_path})

    # Sort the all plot paths alphabetically
    all_plots = sorted(all_plots, key=lambda x: x['path'])

    # Simplify the paths for client-side use
    all_plots = [path['path'].replace('/home/cpasc012/Project_Tester_CS178B/course-project-bic/flask_backend/app/static/', '') for path in all_plots]

    # Extract subject, task, and run from plot file names
    for i, plot in enumerate(all_plots):
        file_name = os.path.basename(plot)
        parts = file_name.split('_')
        subject = task = run = "N/A"  # Default values
        if len(parts) >= 4:
            subject_parts = parts[2].split('-')
            if len(subject_parts) >= 2:
                subject = 'Subject ' + subject_parts[1]
            task_parts = parts[3].split('-')
            if len(task_parts) >= 2:
                task = 'Task ' + task_parts[1]
            run_parts = parts[4].split('-')
            if len(run_parts) >= 2:
                run = 'Run ' + run_parts[1]
            all_plots[i] = {'path': plot, 'subject': subject, 'task': task, 'run': run}

    return jsonify({'plots_paths': all_plots})

@app.route('/api/subjects/<subject_id>/tsv_files', methods=['GET'])
def get_subject_tsv_files(subject_id):
    base_path = f'/home/blore005/data/derivatives/{subject_id}'
    tsv_files = []

    # Walk through the subject's directory to find .tsv files
    for root, dirs, files in os.walk(base_path):
        for file in files:
            if file.endswith('.tsv'):
                # Construct the file's path relative to the base_path
                file_path = os.path.relpath(os.path.join(root, file), base_path)
                tsv_files.append(file_path)

    return jsonify({'tsv_files': tsv_files})

#put later in a different place
def filter_plot(subject_id='all', magnitude=1.0, threshold=0.5, exact_spikes=None, min_spikes=None, max_spikes=None):
    #base_path = '/home/blore005/data/derivatives'
    if base_path is None:
        return jsonify({'error': 'Data path is not set'}), 400

    output_path = '/home/cpasc012/Project_Tester_CS178B/course-project-bic/flask_backend/app/static/tmp'

    subjects = [subject_id] if subject_id != 'all' else [d for d in os.listdir(base_path) if os.path.isdir(os.path.join(base_path, d)) and d.startswith('sub-')]
    #plots = []
    plots_paths = {}

    for subject_folder in subjects:
        subject_folder_path = os.path.join(base_path, subject_folder)
        if os.path.isdir(subject_folder_path):
            func_folder_path = os.path.join(subject_folder_path, 'func')
            if os.path.exists(func_folder_path):
                for file_name in os.listdir(func_folder_path):
                    if file_name.endswith('.tsv'):
                        pattern = r'sub-(\d+)_task-\w+_run-(\d+)_desc'
                        match = re.search(pattern, file_name)

                        if match:
                            subject_number = match.group(1)

                        tsv_path = os.path.join(func_folder_path, file_name)
                        df = pd.read_csv(tsv_path, delimiter='\t')

                        

                        # Highlight spikes that exceed the threshold
                        spikes = df['framewise_displacement'] > threshold
                        spike_count = spikes.sum()
                        if exact_spikes != None and exact_spikes == spike_count:
                            # Framewise Displacement Plot with Spike Highlighting
                            fd_plot_filename = f'fd_plot_{file_name[:-4]}.png'
                            fd_plot_path = os.path.join(output_path, fd_plot_filename)

                        # Remove existing plot file if it exists
                            if os.path.exists(fd_plot_path):
                                os.remove(fd_plot_path)
                        
                            plt.figure(figsize=(10, 6))
                            sns.lineplot(data=df['framewise_displacement'])
                            plt.scatter(df.index[spikes], df['framewise_displacement'][spikes], label='Spikes', edgecolor='r', facecolor='none', s=magnitude*30, linewidths=2)
                            plt.title(f'Subject {subject_number} Framewise Displacement Plot')
                            plt.text(0.96, 0.90, f'Spikes: {spike_count}', horizontalalignment='right', verticalalignment='top', transform=plt.gca().transAxes, fontsize=10, bbox=dict(facecolor='white', alpha=0.5))
                            plt.xlabel('Time')
                            plt.ylabel('Framewise Displacement')
                            plt.legend()
                            plt.savefig(fd_plot_path)
                            plt.close()
                            plots_paths[f'fd_plot_{file_name[:-4]}'] = fd_plot_path

                        elif min_spikes!= None and max_spikes!= None:
                            if min_spikes <= spike_count and spike_count <= max_spikes:
                                 # Framewise Displacement Plot with Spike Highlighting
                                fd_plot_filename = f'fd_plot_{file_name[:-4]}.png'
                                fd_plot_path = os.path.join(output_path, fd_plot_filename)

                        # Remove existing plot file if it exists
                                if os.path.exists(fd_plot_path):
                                     os.remove(fd_plot_path)
                        
                                plt.figure(figsize=(10, 6))
                                sns.lineplot(data=df['framewise_displacement'])
                                plt.scatter(df.index[spikes], df['framewise_displacement'][spikes], label='Spikes', edgecolor='r', facecolor='none', s=magnitude*30, linewidths=2)
                                plt.title(f'Subject {subject_number} Framewise Displacement Plot')
                                plt.text(0.96, 0.90, f'Spikes: {spike_count}', horizontalalignment='right', verticalalignment='top', transform=plt.gca().transAxes, fontsize=10, bbox=dict(facecolor='white', alpha=0.5))
                                plt.xlabel('Time')
                                plt.ylabel('Framewise Displacement')
                                plt.legend()
                                plt.savefig(fd_plot_path)
                                plt.close()
                                plots_paths[f'fd_plot_{file_name[:-4]}'] = fd_plot_path
                             
                                plots_paths[f'fd_plot_{file_name[:-4]}'] = fd_plot_path

    # List to store paths of all plot files
    all_plots = []

    # Recursively traverse the directory structure
    for root, dirs, files in os.walk(output_path):
        for file in files:
            if file.endswith('.png'):
                # Construct the full path to the plot file
                plot_path = os.path.join(root, file)
                # Append the path to the list as a dictionary
                all_plots.append({'path': plot_path})

    # Sort the all plot paths alphabetically
    all_plots = sorted(all_plots, key=lambda x: x['path'])

    # Simplify the paths for client-side use
    all_plots = [path['path'].replace('/home/cpasc012/Project_Tester_CS178B/course-project-bic/flask_backend/app/static/', '') for path in all_plots]

    # Extract subject, task, and run from plot file names
    for i, plot in enumerate(all_plots):
        file_name = os.path.basename(plot)
        parts = file_name.split('_')
        subject = task = run = "N/A"  # Default values
        if len(parts) >= 4:
            subject_parts = parts[2].split('-')
            if len(subject_parts) >= 2:
                subject = 'Subject ' + subject_parts[1]
            task_parts = parts[3].split('-')
            if len(task_parts) >= 2:
                task = 'Task ' + task_parts[1]
            run_parts = parts[4].split('-')
            if len(run_parts) >= 2:
                run = 'Run ' + run_parts[1]
            all_plots[i] = {'path': plot, 'subject': subject, 'task': task, 'run': run}

    return jsonify({'plots_paths': all_plots})

   # return jsonify({'plots_paths': plots_paths})
 

def clear_temp_folder(folder_path):
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print(f'Failed to delete {file_path}. Reason: {e}')

@app.route('/api/filter_plot', methods=['GET'])
def api_filter_plot(): 
    temp_folder_path = '/home/cpasc012/Project_Tester_CS178B/course-project-bic/flask_backend/app/static/tmp'
    clear_temp_folder(temp_folder_path)
    subject_id = request.args.get('subject_id', default='all', type=str)
    magnitude = request.args.get('magnitude', default=1.0, type=float)
    threshold = request.args.get('threshold', default=0.5, type=float)
    exact_spikes = request.args.get('exact_spikes', default=None, type=int)
    min_spikes = request.args.get('min_spikes', default=None, type=int)
    max_spikes = request.args.get('max_spikes', default=None, type=int)

    try:
        plots = filter_plot(subject_id, magnitude, threshold, exact_spikes, min_spikes, max_spikes)
        return plots
    except Exception as e:
        app.logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500




if __name__ == '__main__':
    app.run(debug=True)