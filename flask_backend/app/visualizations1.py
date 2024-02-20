import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

class Visualizations:
    def __init__(self, data_path):
        self.data = pd.read_csv(data_path, delimiter='\t')

    def plot_rotations(self):
        self._plot_with_spikes(['rot_x', 'rot_y', 'rot_z'], 'Rotations Plot', 'Rotation Value')

    def plot_translations(self):
        self._plot_with_spikes(['trans_x', 'trans_y', 'trans_z'], 'Translations Plot', 'Translation Value')

    def plot_framewise(self):
        self._plot_with_spikes(['framewise_displacement'], 'Framewise Displacement Plot', 'Framewise Displacement')

    def _plot_with_spikes(self, columns, title, ylabel, std_dev_factor=3):

        plt.figure(figsize=(10, 6))
        for column in columns:
            series = self.data[column]
            mean = series.mean()
            std_dev = series.std()
            spikes = np.abs(series - mean) > std_dev_factor * std_dev

            plt.plot(series, label=column)
            plt.scatter(series.index[spikes], series[spikes], label=f'{column} spikes', edgecolor='r', facecolor='none', s=100, linewidths=2)

        plt.title(title)
        plt.xlabel('Time')
        plt.ylabel(ylabel)
        plt.legend()
        plt.show()