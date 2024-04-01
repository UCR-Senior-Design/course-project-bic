import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './Plots.css';

const Plot = () => {
  const { subjectFolder } = useParams();
  const [subjectTitle, setSubjectTitle] = useState('');
  const [plots, setPlots] = useState([]);
  const [error, setError] = useState(null);
  const baseURL = 'http://localhost:8080';

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/get_plots/${subjectFolder}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch plot paths');
        }
        return response.json();
      })
      .then(data => {
        setSubjectTitle('Subject ' + subjectFolder.split('-')[1]);
        setPlots(data.plots_paths);
      })
      .catch(error => {
        console.error('Error fetching plot paths:', error);
        setError('Failed to fetch plot paths. Please try again later.');
      });
  }, [subjectFolder]);

  // Group plots by task and run
  const groupedPlots = plots.reduce((acc, plot) => {
    const key = `${plot.task}_${plot.run}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(plot);
    return acc;
  }, {});

  return (
    <div className="images">
      <Container className="mt-5">
        {error && <Alert variant="danger">{error}</Alert>}
      </Container>
      <div className="header-container"> {/* Header outside of container */}
        <h1>{subjectTitle}</h1>
      </div>
      <Container>
        {Object.entries(groupedPlots).map(([key, plots]) => (
          <div key={key}>
            <h2>{key}</h2> {/* Subheader with task and run */}
            {plots.map((plot, index) => (
              <div key={index} className="plots">
                <img
                  src={`http://localhost:5000/static?file_path=${plot.path.substring(1)}`}
                  alt=""
                  className="img-fluid plot-image"
                />
                {/* <p>Subject: {plot.subject}, Task: {plot.task}, Run: {plot.run}</p> */}
              </div>
            ))}
          </div>
        ))}
      </Container>
    </div>
  );  
};

export default Plot;
