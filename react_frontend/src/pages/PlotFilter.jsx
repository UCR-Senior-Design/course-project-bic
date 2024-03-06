import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './PlotFilter.css'





function PlotFilter(){
  //Default inputs
  const defaultThreshold = 0.5; 
  const defaultSpike = 5;
  const defaultMagnitude = 1.0;
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [magnitude, setMagnitude] = useState(defaultMagnitude );
  const [threshold, setThreshold] = useState(defaultThreshold);
  const [numSpikes, setNumSpikes] = useState(defaultSpike);
  const [plots, setPlots] = useState([]);
  const baseURL = 'http://127.0.0.1:5000/static/tmp';
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
    fetch(`http://127.0.0.1:5000/api/filter_plot?subject_id=${selectedSubject}&magnitude=${magnitude}&threshold=${threshold}&max_spikes=${numSpikes}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPlots(data.plots_paths);
      })
      .catch(error => {
        console.error('Error fetching plots:', error);
        setError('Error fetching plots: ' + error.message);
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
          Number of Spikes:
          <input type="number" value={numSpikes} onChange={(e) => setNumSpikes(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      <div>
      {plots.length > 0 ? (
    plots.map((plot, index) => (
      <img key={index} src={`${baseURL}/${plot}`} alt={`Plot ${index + 1}`} style={{ maxWidth: '100%', marginBottom: '10px' }} />
    ))
  ) : (
    <p>No plots to display.</p>
  )}
        
      </div>
    </div>
    </Container>
  );
}

export default PlotFilter;
