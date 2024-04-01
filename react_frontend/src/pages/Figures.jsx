// import React, { useState, useEffect } from 'react';
// import { Container, Alert } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';
// import './Subjects.css';

// const Figures = () => {
//   const { taskName } = useParams();
//   const [svgPaths, setSvgPaths] = useState([]);
//   const [error, setError] = useState(null);
//   const baseURL = 'http://localhost:8080';

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
//   }, [taskName]); 

//   const renderFigureName = (path) => {
//     const parts = path.split('/');
//     const filename = parts[parts.length - 1]; // get the filename from the path
//     const runNumber = filename.split('_')[2]; // split the filename by '_' and get the second part
//     return `${runNumber}`;
//   };

//   return (
//     <div className="figure-report">
//       <Container className="mt-5">
//         {error && <Alert variant="danger">{error}</Alert>} 
//       </Container>
//       <div className="header-container">
//         <h1>{taskName}</h1>
//       </div>
//       <Container>
//         {svgPaths.map((path, index) => (
//           <div key={index} className="figures">
//             <div className="subject-number">
//               {path.split('/')[0]} {renderFigureName(path)}
//             </div>
//               <object
//                 type="image/svg+xml"
//                 data={`${baseURL}/${path}`}
//                 className="img-fluid"
//               >
//                 Your browser does not support SVGs
//               </object>
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
import './Figures.css';

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
  }, [taskName]); 

  const renderSubjectHeader = (path, index) => {
    // extract the subject number from the path 
    const parts = path.split('/');
    const subjectNumber = parts[parts.length - 3]; // get the subject number from the path
    if (index === 0 || subjectNumber !== svgPaths[index - 1].split('/')[3]) {
      return <h2>{subjectNumber}</h2>;
    }
    return null;
  };

  const renderRunNumber = (path) => {
    // extract the run number from the path 
    const parts = path.split('/');
    const filename = parts[parts.length - 1]; // get the filename from the path
    const runNumber = filename.split('_')[2]; // split the filename by '_' and get the second part
    return <p>{runNumber}</p>;
  };

  return (
    <div>
      <Container className="mt-5">
        {error && <Alert variant="danger">{error}</Alert>} {/* Display error message */}
      </Container>

      <div className="header-container"> {/* Header outside of container */}
        <h1>{taskName}</h1>
      </div>
      <Container>
        {/* Render each SVG image stacked */}
        {svgPaths.map((path, index) => (
          <div key={index} className="figures">
            {renderSubjectHeader(path, index)}
            {renderRunNumber(path)}
            <img
              src={`http://localhost:5000/static?file_path=${path}`}
              alt=""
              className="img-fluid"
            />
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Figures;
