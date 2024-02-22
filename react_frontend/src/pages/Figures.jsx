// import React, { useState, useEffect } from 'react';
// import { Container } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';

// const Figures = () => {
//   const { taskName } = useParams();
//   const [svgPaths, setSvgPaths] = useState([]);
//   const baseURL = 'http://localhost:8000'; // Replace with your actual base URL

//   useEffect(() => {
//     fetch(`http://127.0.0.1:5000/get_images?task_name=${taskName}`)
//       .then(response => response.json())
//       .then(data => {
//         setSvgPaths(data.image_paths);
//       })
//       .catch(error => {
//         console.error('Error fetching SVG paths:', error);
//       });
//   }, [taskName]); 

//   return (
//     <div> 
//       <Container className="mt-5">
//         {svgPaths.map((path, index) => (
//           <div key={index} className='figures'>
//             <img src={`${baseURL}/${path}`} alt="" className='img-fluid' id="svg" />
//           </div>
//         ))}
//       </Container>
//     </div>
//   );
// };

// export default Figures;

// import React, { useState, useEffect } from 'react';
// import { Container } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';

// const Figures = () => {
//   // Get the taskName parameter from the URL
//   const { taskName } = useParams();

//   // State to hold the SVG paths fetched from the server
//   const [svgPaths, setSvgPaths] = useState([]);

//   // Base URL for the server
//   const baseURL = 'http://localhost:8000'; // Replace with your actual base URL

//   // Effect to fetch SVG paths when the taskName changes
//   useEffect(() => {
//     fetch(`http://127.0.0.1:5000/get_images?task_name=${taskName}`)
//       .then(response => response.json())
//       .then(data => {
//         // Update the state with the fetched SVG paths
//         setSvgPaths(data.image_paths);
//       })
//       .catch(error => {
//         console.error('Error fetching SVG paths:', error);
//       });
//   }, [taskName]); // This effect depends on taskName

//   return (
//     <div> 
//       <Container className="mt-5">
//         {/* Render each SVG image */}
//         {svgPaths.map((path, index) => (
//           <div key={index} className='figures'>
//             {/* Render the SVG image */}
//             <img src={`${baseURL}/${path}`} alt="" className='img-fluid' id="svg" />
//           </div>
//         ))}
//       </Container>
//     </div>
//   );
// };

// export default Figures;

// import React, { useState, useEffect } from 'react';
// import { Container } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';

// const Figures = () => {
//   // Get the taskName parameter from the URL
//   const { taskName } = useParams();

//   // State to hold the SVG paths fetched from the server
//   const [svgPaths, setSvgPaths] = useState([]);

//   // Base URL for the server
//   const baseURL = 'http://localhost:8000'; // Replace with your actual base URL

//   // Effect to fetch SVG paths when the taskName changes
//   useEffect(() => {
//     fetch(`http://127.0.0.1:5000/get_images?task_name=${taskName}`)
//       .then(response => response.json())
//       .then(data => {
//         // Update the state with the fetched SVG paths
//         setSvgPaths(data.image_paths);
//       })
//       .catch(error => {
//         console.error('Error fetching SVG paths:', error);
//       });
//   }, [taskName]); // This effect depends on taskName

//   return (
//     <div style={{ textAlign: 'right' }}> {/* Align the whole page to the right */}
//       <h1>{taskName}</h1> {/* Display taskName as the title */}
//       <Container className="mt-5">
//         {/* Render each SVG image stacked */}
//         {svgPaths.map((path, index) => (
//           <div key={index} className='figures'>
//             {/* Render the SVG image */}
//             <img 
//               src={`${baseURL}/${path}`} 
//               alt="" 
//               className='img-fluid' 
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
import { Container, Alert } from 'react-bootstrap'; // Import Alert from react-bootstrap
import { useParams } from 'react-router-dom';

const Figures = () => {
  const { taskName } = useParams();
  const [svgPaths, setSvgPaths] = useState([]);
  const [error, setError] = useState(null); 
  const baseURL = 'http://localhost:8000'; 

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

  return (
    <div>
      <Container className="mt-5">
        {error && <Alert variant="danger">{error}</Alert>} {/* Display error message */}
        <h1>{taskName}</h1>
        {/* Render each SVG image stacked */}
        {svgPaths.map((path, index) => (
          <div key={index} className="figures">
            <img 
            src={`${baseURL}/${path}`} 
            alt="" 
            className="img-fluid" 
            style={{ width: `800px` }} 
            />
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Figures;
