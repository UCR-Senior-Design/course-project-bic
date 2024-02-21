import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Subjects = () => {
  const { subjectFolder } = useParams();
  const [subjectTitle, setSubjectTitle] = useState('');
  const [svgPaths, setSvgPaths] = useState([]);
  const baseURL = 'http://localhost:8000'; // Replace with your actual base URL

  useEffect(() => {
    fetch(`/svg_paths?subject_folder=${subjectFolder}`)
      .then(response => response.json())
      .then(data => {
        setSubjectTitle(subjectFolder); // Set the subject folder as the title
        setSvgPaths(data.svg_paths);
      })
      .catch(error => {
        console.error('Error fetching SVG paths:', error);
      });
  }, [subjectFolder]); 

  return (
    <div> 
      <Container className="mt-5">
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