// import React, { useState, useEffect } from 'react';
// import { Container, Alert } from 'react-bootstrap'; // Import Alert from react-bootstrap
// import { useParams } from 'react-router-dom';

// const Plot = () => {
//   const { subjectFolder } = useParams();
//   const [subjectTitle, setSubjectTitle] = useState('');
//   const [plotPaths, setPlotPaths] = useState([]);
//   const [error, setError] = useState(null); // State to hold error message
//   const baseURL = 'http://localhost:8080';

//   useEffect(() => {
//     fetch(`http://127.0.0.1:5000/get_plots/${subjectFolder}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch plot paths');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setSubjectTitle(subjectFolder); // Set the subject folder as the title
//         setPlotPaths(data.plots_paths);
//       })
//       .catch(error => {
//         console.error('Error fetching plot paths:', error);
//         setError('Failed to fetch plot paths. Please try again later.'); // Set error message
//       });
//   }, [subjectFolder]);

//   return (
//     <div>
//       <Container className="mt-5">
//         {error && <Alert variant="danger">{error}</Alert>} {/* Display error message */}
//         <h1>{subjectTitle}</h1> {/* Display subject folder title */}
//         {plotPaths.map((path, index) => (
//           <div key={index} className='plots'>
//             <img
//               src={`${baseURL}/${path}`}
//               alt=""
//               className='img-fluid plot-image'
//             />
//             <p>{path.split('/').pop()}</p> {/* Display image name as label */}
//           </div>
//         ))}
//       </Container>
//     </div>
//   );
// };

// export default Plot;

import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Plot = () => {
  const { subjectFolder } = useParams();
  const [subjectTitle, setSubjectTitle] = useState('');
  const [plots, setPlots] = useState([]);
  const [error, setError] = useState(null);
  const baseURL = 'http://localhost:8080';

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/get_plots/${subjectFolder}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch plot paths');
        }
        return response.json();
      })
      .then(data => {
        setSubjectTitle(subjectFolder);
        setPlots(data.plots_paths);
      })
      .catch(error => {
        console.error('Error fetching plot paths:', error);
        setError('Failed to fetch plot paths. Please try again later.');
      });
  }, [subjectFolder]);

  return (
    <div>
      <Container className="mt-5">
        {error && <Alert variant="danger">{error}</Alert>}
        <h1>{subjectTitle}</h1>
        {plots.map((plot, index) => (
          <div key={index} className="plots">
            <img
              src={`${baseURL}/${plot.path}`}
              alt=""
              className="img-fluid plot-image"
            />
            <p>Subject: {plot.subject}, Task: {plot.task}, Run: {plot.run}</p>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Plot;
