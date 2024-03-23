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
        setSubjectTitle(getSubjectTitle(subjectFolder)); // Set the subject folder as the title
        setSvgPaths(data.svg_paths);
      })
      .catch(error => {
        console.error('Error fetching SVG paths:', error);
        setError('Failed to fetch SVG paths. Please try again later.'); // Set error message
      });
  }, [subjectFolder]);


  // Function to get subject title based on subject folder name
  const getSubjectTitle = (folderName) => {
    // Example: Convert "sub-01" to "Subject 1"
    return `Subject ${parseInt(folderName.split('-')[1])}`;
  };

  // Function to group SVG paths by task_type
  const groupByTaskType = () => {
    return svgPaths.reduce((acc, svgPath) => {
      const { path, task_type } = svgPath;
      let taskTypeWithPrefix = task_type; // Initialize with task_type

      // add the prefix "task-" if task_type is not "anatomical"
      if (task_type !== 'anatomical') {
        taskTypeWithPrefix = `task-${task_type}`;
      }

      if (!acc[taskTypeWithPrefix]) {
        acc[taskTypeWithPrefix] = [];
      }
      acc[taskTypeWithPrefix].push(path);
      return acc;
    }, {});
  };

  const getImageName = (path, taskType) => {
    // Split the path by underscores
    const parts = path.split('_');

    // Check if the taskType is "anatomical" or has "task" prefix
    if (taskType === 'anatomical') {
      // If "anatomical", return the last part before .svg
      return parts[parts.length - 2];
    } else if (taskType.startsWith('task')) {
      // If has "task" prefix, skip the first three parts (subject number, task type, and "run-01") and return the remaining part before .svg
      return parts.slice(3, -1).join('_');
    } else {
      // For other cases, return the last part before .svg
      return parts[parts.length - 2];
    }
  };


  // return (
  //   <div>
  //     <Container className="mt-5">
  //       {error && <Alert variant="danger">{error}</Alert>} {/* Display error message */}
  //     </Container>
  //     <div className="header-container"> {/* Header outside of container */}
  //       <h1>{subjectTitle}</h1>
  //     </div>
  //     <Container>

  //       {Object.entries(groupByTaskType()).map(([taskType, paths], index) => (
  //         <div key={index}>
  //           <h2>{taskType}</h2> {/* Render subheader with taskType */}
  //           {paths.map((path, index) => (

  //             <div key={index} className='subjects'>
  //               <p>{path.split('/').pop()}</p> {/* Display image name as label */}
  //               <object
  //                 type="image/svg+xml"
  //                 data={`${baseURL}/${path}`}
  //                 className="img-fluid"
  //               >
  //                 Your browser does not support SVGs
  //               </object>
  //             </div>
  //           ))}
  //         </div>
  //       ))}
  //     </Container>
  //   </div>
  // );
  return (
    <div className="subject-report">
      <Container className="mt-5">
        {error && <Alert variant="danger">{error}</Alert>}
      </Container>
      <div className="header-container">
        <h1>{subjectTitle}</h1>
      </div>
      <Container>
        {Object.entries(groupByTaskType()).map(([taskType, paths], index) => (
          <div key={index}>
            <h2>{taskType}</h2>
            {paths.map((path, index) => (
              <div key={index} className='subjects'>
                <p>{path.split('/').pop()}</p>
                <object
                  type="image/svg+xml"
                  data={`${baseURL}/${path}`}
                  className="img-fluid"
                >
                  Your browser does not support SVGs
                </object>
              </div>
            ))}
          </div>
        ))}
      </Container>
    </div>
  );  
};


export default Subjects;