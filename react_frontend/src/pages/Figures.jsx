// import React, { useState, useEffect } from 'react';
// import { Container, Alert } from 'react-bootstrap'; // Import Alert from react-bootstrap
// import { useParams } from 'react-router-dom';
// import './Subjects.css'

// const Figures = () => {
//   const { taskName } = useParams();
//   const [svgPaths, setSvgPaths] = useState([]);
//   const [error, setError] = useState(null); 
//   const baseURL = 'http://localhost:8000'; 

//   // Effect to fetch SVG paths when the taskName changes
//   useEffect(() => {
//     fetch(`http://127.0.0.1:5000/get_images?task_name=${taskName}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch SVG paths');
//         }
//         return response.json();
//       })
//       .then(data => {
//         // Update the state with the fetched SVG paths
//         setSvgPaths(data.image_paths);
//       })
//       .catch(error => {
//         console.error('Error fetching SVG paths:', error);
//         setError('Failed to fetch SVG paths. Please try again later.'); // Set error message
//       });
//   }, [taskName]); // This effect depends on taskName

//   return (
//     <div>
//       <Container className="mt-5">
//         {error && <Alert variant="danger">{error}</Alert>} {/* Display error message */}
//         <h1>{taskName}</h1>
//         {/* Render each SVG image stacked */}
//         {svgPaths.map((path, index) => (
//           <div key={index} className="figures">
//             <img 
//             src={`${baseURL}/${path}`} 
//             alt="" 
//             className="img-fluid" 
//             style={{ width: `800px` }} 
//             />
//           </div>
//         ))}
//       </Container>
//     </div>
//   );
// };

// export default Figures;

// import React, { useState, useEffect } from 'react';
// import { Container, Alert } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';
// import './Subjects.css';

// const Figures = () => {
//   const { taskName } = useParams();
//   const [svgPaths, setSvgPaths] = useState([]);
//   const [error, setError] = useState(null); 
//   const baseURL = 'http://localhost:8000'; 

//   // Extract the subject number from the taskName
//   // const subjectNumber = taskName.split('/')[0]; 

//   // Effect to fetch SVG paths when the taskName changes
//   useEffect(() => {
//     fetch(`http://127.0.0.1:5000/get_images?task_name=${taskName}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch SVG paths');
//         }
//         return response.json();
//       })
//       .then(data => {
//         // Update the state with the fetched SVG paths
//         setSvgPaths(data.image_paths);
//       })
//       .catch(error => {
//         console.error('Error fetching SVG paths:', error);
//         setError('Failed to fetch SVG paths. Please try again later.'); // Set error message
//       });
//   }, [taskName]); // This effect depends on taskName

//   return (
//     <div>
//       <Container className="mt-5">
//         {error && <Alert variant="danger">{error}</Alert>} {/* Display error message */}
//         <h1>{taskName}</h1>
//         {/* Render each SVG image stacked */}
//         {svgPaths.map((path, index) => (
//           <div key={index} className="figures">
//             <div className="subject-number">{path.split('/')[0]}</div>
//             <img 
//               src={`${baseURL}/${path}`} 
//               alt="" 
//               className="img-fluid" 
//               style={{ width: `800px` }} 
//             />
//           </div>
//         ))}
//       </Container>
//     </div>
//   );
// };

// export default Figures;

import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './Subjects.css';

const Figures = () => {
  const { taskName } = useParams();
  const [svgPaths, setSvgPaths] = useState([]);
  const [error, setError] = useState(null);
  const baseURL = 'http://localhost:8080';

  // Effect to fetch SVG paths when the taskName changes
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/get_images?task_name=${taskName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch SVG paths');
        }
        return response.json();
      })
      .then(data => {
        // Update the state with the fetched SVG paths
        setSvgPaths(data.image_paths);
      })
      .catch(error => {
        console.error('Error fetching SVG paths:', error);
        setError('Failed to fetch SVG paths. Please try again later.'); // Set error message
      });
  }, [taskName]); // This effect depends on taskName
  const setMaxDimensions = (width, height) => {
    if (width > height) {
      return { maxWidth: '800px' };
    } else {
      return { maxHeight: '400px' };
    }
  };

  // const renderFigureName = (path) => {
  //   // extract the run number from the path 
  //   const runNumber = path.split('/')[0].split('-')[1];
  //   return `Run ${runNumber}`;
  // };


  // const renderFigureName = (path, index) => {
  //   // extract the subject number from the path
  //   const subjectNumber = path.split('/')[0];
  //   // generate run numbers for task "task-tv"
  //   if (taskName === 'task-tv') {
  //     const runNumber = index + 1;
  //     return `${subjectNumber} run ${runNumber}`;
  //   } else {
  //     // for other tasks, only display the subject number
  //     return subjectNumber;
  //   }
  // };

  const renderFigureName = (path) => {
    // extract the run number from the path 
    const parts = path.split('/');
    const filename = parts[parts.length - 1]; // get the filename from the path
    const runNumber = filename.split('_')[2]; // split the filename by '_' and get the second part
    return `${runNumber}`;
  };

  return (
    <div>
      <Container className="mt-5">
        {error && <Alert variant="danger">{error}</Alert>} {/* Display error message */}
        <h1>{taskName}</h1>
        {/* Render each SVG image stacked */}
        {svgPaths.map((path, index) => (
          <div key={index} className="figures">
            <div className="subject-number">{path.split('/')[0]} {renderFigureName(path)}</div>
            <img
              src={`${baseURL}/${path}`}
              alt=""
              className="img-fluid"
              style={{ maxWidth: '100%', ...setMaxDimensions(800, 400) }}  // Set max dimensions here
            />
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Figures;
//   return (
//     <div>
//       <Container className="mt-5">
//         {error && <Alert variant="danger">{error}</Alert>} {/* Display error message */}
//         <h1>{taskName}</h1>
//         {/* Render each SVG image stacked */}
//         {svgPaths.map((path, index) => (
//           <div key={index} className="figures">
//             <img 
//               src={`${baseURL}/${path}`} 
//               alt="" 
//               className="img-fluid" 
//               style={{ width: `800px` }} 
//             />
//           </div>
//         ))}
//       </Container>
//     </div>
//   );
// };

// export default Figures;
