import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './PlotType.css';

const Plot = () => {
  const { plotType } = useParams();
  const [subjectTitle, setSubjectTitle] = useState('');
  const [plots, setPlots] = useState([]);
  const [error, setError] = useState(null);
  const baseURL = 'http://localhost:8080';

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/get_plots/${plotType}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch plot paths');
        }
        return response.json();
      })
      .then(data => {
        setSubjectTitle(plotType);
        setPlots(data.plots_paths);
      })
      .catch(error => {
        console.error('Error fetching plot paths:', error);
        setError('Failed to fetch plot paths. Please try again later.');
      });
  }, [plotType]);

  // Function to group plots by subject
  const groupPlotsBySubject = () => {
    const groupedPlots = {};
    plots.forEach(plot => {
      if (!groupedPlots[plot.subject]) {
        groupedPlots[plot.subject] = [];
      }
      groupedPlots[plot.subject].push(plot);
    });
    return groupedPlots;
  };

  const groupedPlots = groupPlotsBySubject();

  return (
    <div>
      <Container className="mt-5">
        {error && <Alert variant="danger">{error}</Alert>}
      </Container>
      <div className="header-container"> {/* Header outside of container */}
        <h1>{subjectTitle}</h1>
      </div>
      <Container>
        {Object.entries(groupedPlots).map(([subject, plots]) => (
          <div key={subject}>
            <h2>{subject}</h2>
            <div className="plots">
              {plots.map((plot, index) => (
                <div key={index}>
                  <p>{plot.task} - {plot.run}</p>
                  <img
                    src={`${baseURL}/${plot.path}`}
                    alt=""
                    className="img-fluid plot-image"
                  />
                  {/* <p>Task: {plot.task}, Run: {plot.run}</p> */}
                </div>
              ))}
            </div>
          </div>
        ))}
      </Container>
    </div>
  );  
};

export default Plot;
