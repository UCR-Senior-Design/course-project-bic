import os
import pandas as pd
import matplotlib.pyplot as plt

# Define the base directory where the sub-xx folders are located
base_dir = '/home/blore005/data/derivatives'

# Define the directory where the graphs should be saved
graphs_dir = os.path.join(base_dir, '/home/blore005/course-project-bic-claudia/flask_backend_app/static/Graphs_images')

# Ensure the graphs directory exists
os.makedirs(graphs_dir, exist_ok=True)


for item in os.listdir(base_dir):
    item_path = os.path.join(base_dir, item)
    
    # Check if the current item is a directory and matches the 'sub-xx' pattern
    if os.path.isdir(item_path) and item.startswith('sub-'):
        # Construct the path to the func directory within the current sub-xx directory
        func_dir = os.path.join(item_path, 'func')
        
        # Check if the func directory exists
        if os.path.exists(func_dir):
            # Iterate over each file in the func directory
            for file in os.listdir(func_dir):
                # Check if the current file is a .tsv file
                if file.endswith('.tsv'):
                    # Read the .tsv file into a DataFrame
                    df = pd.read_csv(os.path.join(func_dir, file), sep='\t')
                    
                    # Generate a plot from the DataFrame
                    df.plot()
                    plt.title(file)
                    
                    # Define the path for the graph directory specific to the current sub-xx
                    sub_graph_dir = os.path.join(graphs_dir, item)
                    os.makedirs(sub_graph_dir, exist_ok=True)
                    
                    # Define the path for the graph, removing the .tsv extension from the file name
                    graph_path = os.path.join(sub_graph_dir, file[:-4] + '.png')
                    
                    # Save the graph
                    plt.savefig(graph_path)
                    plt.close()