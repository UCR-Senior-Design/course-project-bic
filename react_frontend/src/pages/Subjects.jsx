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

  // Function to group SVG paths by task_type
  const groupByTaskType = () => {
    return svgPaths.reduce((acc, svgPath) => {
      const { path, task_type } = svgPath;
      if (!acc[task_type]) {
        acc[task_type] = [];
      }
      acc[task_type].push(path);
      return acc;
    }, {});
  };

  return (
    <div>
      <div className="subject-title-container"> {/* Container for subject title */}
        <h1 className="subject-title">{subjectTitle}</h1> {/* Display subject folder title */}
      </div>
      <Container className="mt-5">
        {error && <Alert variant="danger">{error}</Alert>} {/* Display error message */}

        {Object.entries(groupByTaskType()).map(([taskType, paths], index) => (
          <div key={index}>
            <h2>{taskType}</h2> {/* Render subheader with taskType */}
            {paths.map((path, index) => (
              <div key={index} className='subjects'>
                <img
                  src={`${baseURL}/${path}`}
                  alt=""
                  className='img-fluid'
                  style={{ width: `800px` }}
                />
                <p>{path.split('/').pop()} </p> {/* Display image name as label */}
              </div>
            ))}
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Subjects;
