import React, { useState } from 'react';
import rot from "/Users/claudiapascual/CS178A_Project/course-project-bic/flask_backend/app/static/images/rotations_plot.png";
import trans from "/Users/claudiapascual/CS178A_Project/course-project-bic/flask_backend/app/static/images/translations_plot.png";
import frame from "/Users/claudiapascual/CS178A_Project/course-project-bic/flask_backend/app/static/images/framewise_plot.png";
const VisualizationComponent = () => {
  const [plots, setPlots] = useState({});

  const handleGeneratePlots = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/visualizations/generate_plots');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Received data:', data);
      setPlots(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Data Visualizations</h1>
      <button onClick={handleGeneratePlots}>Generate Plots</button>

      <div>
      {plots.rotations && (
          <h2>Rotations Plot</h2>
        )}
     
        {plots.rotations && (
          <img src={rot} alt="Rotations Plot" />
        )}
      </div>

      <div>
      {plots.translations && (
          <h2>Translations Plot</h2>
        )}
        
        {plots.translations && (
          <img src={trans} alt="Translations Plot" />
        )}
      </div>

      <div>
      {plots.framewise&& (
        <h2>Framewise Displacement Plot</h2>
        )}
        {plots.framewise && (
          <img src={frame} alt="Framewise Displacement Plot" />
        )}
      </div>
    </div>
  );
};

export default VisualizationComponent;
