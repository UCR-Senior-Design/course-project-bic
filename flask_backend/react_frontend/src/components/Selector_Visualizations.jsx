import React, { useState, useEffect } from 'react';

const FileSelect = ({ onFileSelect }) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');

  useEffect(() => {
    // Fetch the list of available files from the Flask backend
    fetch('http://127.0.0.1:5000/visualizations/list_files')
      .then((response) => response.json())
      .then((data) => setFiles(data.files))
      .catch((error) => console.error('Error fetching files:', error));
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.value;
    setSelectedFile(file);
  };

  const handleSelect = () => {
    if (selectedFile) {
      // Send the selected file to the Flask backend
      fetch('http://127.0.0.1:5000/visualizations/plotter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedFile }),
      })
        .then((response) => response.json())
        .then((data) => {
          onFileSelect(data); // Pass the data to your parent component or update state as needed
        })
        .catch((error) => {
          console.error('Error selecting file:', error);
        });
    } else {
      console.error('No file selected');
    }
  };

  return (
    <div>
      <select onChange={handleFileChange} value={selectedFile}>
        <option value="">Select a file</option>
        {files.map((file) => (
          <option key={file} value={file}>
            {file}
          </option>
        ))}
      </select>
      <button onClick={handleSelect}>Select File</button>
    </div>
  );
};

export default FileSelect;
