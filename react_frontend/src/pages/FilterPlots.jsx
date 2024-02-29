import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './FilterPlots.css'





function FilterPlots(){

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
    fetch(`http://127.0.0.1:5000/get_filter_plots`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch plot paths');
        }
        return response.json();
      })
      .then(data => {
        setPlots(data.plots_paths);
      })
      .catch(error => {
        console.error('Error fetching plot paths:', error);
        setError('Failed to fetch plot paths. Please try again later.');
      });
  }, []);

  

  return (
    <div>
      <Container>
            <div className="plots">
              {plots.map((plot, index) => (
                <div key={index}>
                <p>{plot.subject} - {plot.task} - {plot.run}</p>
                  <img
                    src={`${baseURL}/${plot.path}`}
                    alt=""
                    className="img-fluid plot-image"
                  />
                  {/* <p>Task: {plot.task}, Run: {plot.run}</p> */}
                  </div>
                ))}
            </div>
      </Container>
    </div>
  );  
};

  
 

export default FilterPlots;
