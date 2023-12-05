// Visualizations.jsx
import React, { useState } from 'react';

const Visualizations = ({ onGraphSelect }) => {
  const [selectedSection, setSelectedSection] = useState('');

  const handleSelectChange = (e) => {
    setSelectedSection(e.target.value);
  };

  const handleGraphButtonClick = async () => {
    // Make a request to the Flask backend
    try {
      const response = await fetch('/graph/generate_graph', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selected_section: selectedSection }),
      });

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error:', error);
    }

    // Notify the parent component about the selected section
    onGraphSelect(selectedSection);
  };


  return (
    <div>
      <label htmlFor="section">Select Section:</label>
      <select id="section" onChange={handleSelectChange} value={selectedSection}>
        <option value="rot_x">Rotation X</option>
        <option value="rot_y">Rotation Y</option>
        <option value="rot_z">Rotation Z</option>
        {/* Add more options as needed */}
      </select>
      <button onClick={handleGraphButtonClick}>Graph</button>
    </div>
  );
};

export default Visualizations;
