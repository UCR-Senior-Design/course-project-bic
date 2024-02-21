import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Figures = () => {
  const { taskName } = useParams();
  const [svgPaths, setSvgPaths] = useState([]);
  const baseURL = 'http://localhost:8000'; // Replace with your actual base URL

  useEffect(() => {
    fetch(`/get_images?task_name=${taskName}`)
      .then(response => response.json())
      .then(data => {
        setSvgPaths(data.image_paths);
      })
      .catch(error => {
        console.error('Error fetching SVG paths:', error);
      });
  }, [taskName]); 

  return (
    <div> 
      <Container className="mt-5">
        {svgPaths.map((path, index) => (
          <div key={index} className='figures'>
            <img src={`${baseURL}/${path}`} alt="" className='img-fluid' id="svg" />
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Figures;
