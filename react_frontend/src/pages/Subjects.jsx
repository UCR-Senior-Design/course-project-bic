// import React, { useState, useEffect } from 'react';
// import { Container, Alert } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';
// import './Subjects.css'

// const Subjects = () => {
//   const { subjectFolder } = useParams();
//   const [subjectTitle, setSubjectTitle] = useState('');
//   const [svgPaths, setSvgPaths] = useState([]);
//   const [error, setError] = useState(null);
//   const baseURL = 'http://localhost:8080';

//   useEffect(() => {
//     fetch(`http://localhost:5000/svg_paths?subject_folder=${subjectFolder}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch SVG paths');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setSubjectTitle(getSubjectTitle(subjectFolder));
//         setSvgPaths(data.svg_paths);
//       })
//       .catch(error => {
//         console.error('Error fetching SVG paths:', error);
//         setError('Failed to fetch SVG paths. Please try again later.');
//       });
//   }, [subjectFolder]);

//   const getSubjectTitle = (folderName) => {
//     return `Subject ${parseInt(folderName.split('-')[1])}`;
//   };

//   const renderSVG = (svgPath, index) => (
//     <div key={index} className='subjects'>
//       <p>{svgPath.image_name}</p>
//       <object
//         type="image/svg+xml"
//         data={`${baseURL}/${svgPath.path}`}
//         className="img-fluid"
//       >
//         Your browser does not support SVGs
//       </object>
//     </div>
//   );

//   const groupByTaskType = () => {
//     return svgPaths.reduce((acc, svgPath) => {
//       const { task_type } = svgPath;
//       acc[task_type] = acc[task_type] || [];
//       acc[task_type].push(svgPath);
//       return acc;
//     }, {});
//   };

//   return (
//     <div className="subject-report">
//       <Container className="mt-5">
//         {error && <Alert variant="danger">{error}</Alert>}
//       </Container>
//       <div className="header-container">
//         <h1>{subjectTitle}</h1>
//       </div>
//       <Container>
//         {Object.entries(groupByTaskType()).map(([taskType, paths], index) => (
//           <div key={index}>
//             <h2>{taskType}</h2>
//             {paths.map(renderSVG)}
//           </div>
//         ))}
//       </Container>
//     </div>
//   );  
// };

// export default Subjects;

import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './Subjects.css'

const Subjects = () => {
  const { subjectFolder } = useParams();
  const [subjectTitle, setSubjectTitle] = useState('');
  const [svgPaths, setSvgPaths] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/svg_paths?subject_folder=${subjectFolder}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch SVG paths');
        }
        return response.json();
      })
      .then(data => {
        setSubjectTitle(getSubjectTitle(subjectFolder));
        setSvgPaths(data.svg_paths);
      })
      .catch(error => {
        console.error('Error fetching SVG paths:', error);
        setError('Failed to fetch SVG paths. Please try again later.');
      });
  }, [subjectFolder]);

  const getSubjectTitle = (folderName) => {
    return `Subject ${parseInt(folderName.split('-')[1])}`;
  };

  const renderSVG = (svgPath, index) => (
    <div key={index} className='subjects'>
      <p>{svgPath.image_name}</p>
      <object
        type="image/svg+xml"
        data={`http://localhost:5000/static?file_path=${svgPath.path}`}
        className="img-fluid"
      >
        Your browser does not support SVGs
      </object>
    </div>
  );

  const groupByTaskType = () => {
    return svgPaths.reduce((acc, svgPath) => {
      const { task_type } = svgPath;
      acc[task_type] = acc[task_type] || [];
      acc[task_type].push(svgPath);
      return acc;
    }, {});
  };

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
            {paths.map(renderSVG)}
          </div>
        ))}
      </Container>
    </div>
  );  
};

export default Subjects;