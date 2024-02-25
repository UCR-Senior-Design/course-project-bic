import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap'; // Import Alert from react-bootstrap
import { useParams } from 'react-router-dom';
import './Subjects.css'

const Subjects = () => {
  const { subjectFolder } = useParams();
  const [subjectTitle, setSubjectTitle] = useState('');
  const [svgPaths, setSvgPaths] = useState([]);
  const [error, setError] = useState(null); // State to hold error message
  const baseURL = 'http://localhost:8080';

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/svg_paths?subject_folder=${subjectFolder}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch SVG paths');
        }
        return response.json();
      })
      .then(data => {
        setSubjectTitle(subjectFolder); // Set the subject folder as the title
        setSvgPaths(data.svg_paths);
      })
      .catch(error => {
        console.error('Error fetching SVG paths:', error);
        setError('Failed to fetch SVG paths. Please try again later.'); // Set error message
      });
  }, [subjectFolder]); 

  return (
    <div> 
      <Container className="mt-5">
        {error && <Alert variant="danger">{error}</Alert>} {/* Display error message */}
        <h1>{subjectTitle}</h1> {/* Display subject folder title */}
        {svgPaths.map((path, index) => (
          <div key={index} className='subjects'>
            <img 
              src={`${baseURL}/${path}`} 
              alt="" 
              className='img-fluid' 
              style={{ width: `800px` }} 
            />
            <p>{path.split('/').pop()}</p> {/* Display image name as label */}
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Subjects;
