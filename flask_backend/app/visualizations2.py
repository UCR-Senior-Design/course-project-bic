# /flask_backend/app/visualizations2.py

import pandas as pd
import matplotlib.pyplot as plt


class Visualizations:
    def __init__(self, data_path):
        self.data = pd.read_csv(data_path, delimiter='\t')

    def plot_rotations(self):
        plt.plot(self.data['rot_x'], label='rot_x')
        plt.plot(self.data['rot_y'], label='rot_y')
        plt.plot(self.data['rot_z'], label='rot_z')
        plt.title('Rotations Plot')
        plt.xlabel('Time')  # Assuming time is the x-axis
        plt.ylabel('Rotation Value')  # General y-axis label
        plt.legend()
        plt.show()

    def plot_translations(self):
        plt.plot(self.data['trans_x'], label='trans_x')
        plt.plot(self.data['trans_y'], label='trans_y')
        plt.plot(self.data['trans_z'], label='trans_z')
        plt.xlabel('Time')  # Assuming time is the x-axis
        plt.ylabel('Translation Value')  # General y-axis label
        plt.title('Translations Plot')
        plt.legend()
        plt.show()

    def plot_framewise(self):
        plt.plot(self.data['framewise_displacement'], label='framewise_displacement')
        plt.title('Framewise Displacement Plot')
        plt.xlabel('Time')  # Assuming time is the x-axis
        plt.ylabel('Framewise')  # General y-axis label
        plt.legend()
        plt.show()
