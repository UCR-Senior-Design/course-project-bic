import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import './PlotFilter.css'

function PlotFilter(){
  //Default inputs
  const [isLoading, setIsLoading] = useState(false);

  const defaultThreshold = 0.5; 
  const defaultSpike = 5;
  const defaultMagnitude = 1.0;
  
  //const [selectedSubject, setSelectedSubject] = useState('all');
  const [magnitude, setMagnitude] = useState(defaultMagnitude );
  const [threshold, setThreshold] = useState(defaultThreshold);
 // const [numSpikes, setNumSpikes] = useState(defaultSpike);
  const [maxSpikes, setMaxSpikes] = useState(defaultSpike);
  const [plots, setPlots] = useState([]);
  const [error, setError] = useState('');

  
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form from refreshing the page on submit
    let queryParams = `magnitude=${magnitude}&threshold=${threshold}&max_spikes=${maxSpikes}`;

    fetch(`http://127.0.0.1:5000/api/filter_plot?${queryParams}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPlots(data.plots_paths);
        setIsLoading(false); // Stop loading once the data is received
      })
      .catch(error => {
        console.error('Error fetching plots:', error);
        setError('Error fetching plots: ' + error.message);
        setIsLoading(false); // Stop loading on error
      });
  }

  return (
    <div className="plot-filter-container">
      <Container>
        <div className="form-container">
          <form onSubmit={handleSubmit}>

            <label>
              Magnitude:
              <input type="number" value={magnitude} onChange={(e) => setMagnitude(e.target.value)} step="0.1" />
            </label>
            <br />
            <label>
              Threshold:
              <input type="number" value={threshold} onChange={(e) => setThreshold(e.target.value)} step="0.1" />
            </label>
            <br />
            <label>
              View Plots with Spikes More than:
              <input type="number" value={maxSpikes} onChange={(e) => setMaxSpikes(e.target.value)} />
            </label>
            <br />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Submit'}
            </button>
          </form>
        </div>

        {isLoading && (
          <div className="loading-indicator">
            Loading plots... {/* You can replace this with a spinner or any loading indicator you prefer */}
          </div>
        )}

        <div className="plots-container">
          {!isLoading && plots.length > 0 ? (
            plots.map((plot, index) => (
              <div key={index}>
                <p>{plot.subject} - {plot.task} - {plot.run}</p>
                <img
                  src={`http://localhost:5000/static?file_path=${plot.path.substring(1)}`}
                  alt=""
                  className="img-fluid plot-image"
                />
              </div>
            ))
          ) : (
            <p>No plots to display.</p>
          )}
        </div>
        
      </Container>
    </div>
  );
}

export default PlotFilter;
