import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './PlotFilter.css'





function PlotFilter(){
  //Default inputs
  const [isLoading, setIsLoading] = useState(false);

  const defaultThreshold = 0.5; 
  const defaultSpike = 5;
  const defaultMagnitude = 1.0;
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [magnitude, setMagnitude] = useState(defaultMagnitude );
  const [threshold, setThreshold] = useState(defaultThreshold);
 // const [numSpikes, setNumSpikes] = useState(defaultSpike);
  const [spikeSelectionMode, setSpikeSelectionMode] = useState('exact'); // Options: 'exact', 'range'
  const [exactSpikes, setExactSpikes] = useState(defaultSpike);
  const [minSpikes, setMinSpikes] = useState('');
  const [maxSpikes, setMaxSpikes] = useState('');
  const [plots, setPlots] = useState([]);
  const baseURL = 'http://127.0.0.1:5000/static';
  const [error, setError] = useState('');
  //const [imageUrl, setImageUrl] = useState('');
  // Define a default threshold value


  //const [selectedColumn, setSelectedColumn] = useState('');
 // const [selectedDataset, setSelectedDataset] = useState('');

  // Example options for columns and datasets
   // Fetch subjects on component mount

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/subjects`)
    .then(response => response.json())
    .then(data => setSubjects(data.subjects))
    .catch(error => console.error('Error fetching subjects:', error));
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form from refreshing the page on submit
    let queryParams = `subject_id=${selectedSubject}&magnitude=${magnitude}&threshold=${threshold}`;

    if (spikeSelectionMode === 'exact') {
      queryParams += `&exact_spikes=${exactSpikes}`;
    } else if (spikeSelectionMode === 'range') {
      queryParams += `&min_spikes=${minSpikes}&max_spikes=${maxSpikes}`;
    }

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
    <Container className="mt-5">
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Subject:
          <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
             <option value="">Select a subject</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
              <option value="all">All Subjects</option> {/* Add this line */}
          </select>
        </label>
        <br />
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
  Spike Selection Mode:
  <select value={spikeSelectionMode} onChange={(e) => setSpikeSelectionMode(e.target.value)}>
    <option value="exact">Exact</option>
    <option value="range">Range</option>
  </select>
</label>
<br />

{spikeSelectionMode === 'exact' && (
  <label>
    Exact Number of Spikes:
    <input type="number" value={exactSpikes} onChange={(e) => setExactSpikes(e.target.value)} />
  </label>
)}

{spikeSelectionMode === 'range' && (
  <>
    <label>
      Min Number of Spikes:
      <input type="number" value={minSpikes} onChange={(e) => setMinSpikes(e.target.value)} />
    </label>
    <br />
    <label>
      Max Number of Spikes:
      <input type="number" value={maxSpikes} onChange={(e) => setMaxSpikes(e.target.value)} />
    </label>
    <br />
  </>
)}
<br />
<button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>

      {isLoading && (
        <div>Loading plots...</div> // You can replace this with a spinner or any loading indicator you prefer
      )}
      <div>
      {!isLoading && (
            <div className="plots">
            {plots.length > 0 ? (
              plots.map((plot, index) => (
                <div key={index}>
                <p>{plot.subject} - {plot.task} - {plot.run}</p>
                  <img
                    src={`${baseURL}/${plot.path}`}
                    alt=""
                    className="img-fluid plot-image"
                  />
                  </div>
                ))): (<p>No plots to display.</p>)}
            </div>
      )}
      </div>
    </div>
    </Container>
  );
}

export default PlotFilter;
