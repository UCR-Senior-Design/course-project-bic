import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileViewer = ({ onSelectFile }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get('/list_files')
      .then(response => setFiles(response.data.files))
      .catch(error => console.error('Error fetching files:', error));
  }, []);

  return (
    <div>
      <h2>Select a File</h2>
      <ul>
        {files.map(file => (
          <li key={file} onClick={() => onSelectFile(file)}>{file}</li>
        ))}
      </ul>
    </div>
  );
};

export default FileViewer;