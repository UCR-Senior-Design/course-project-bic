import React, { useState } from 'react';

function PlotFilterPage() {
  // Define a default threshold value
  const defaultThreshold = 10; // This is an example value. Adjust as needed.
  const defaultSpike = 5;
  const defaultMagnitude = 1;
  const [threshold, setThreshold] = useState(defaultThreshold);
  const [spike, setSpike] = useState(defaultSpike);
  const [magnitude, setMagnitude] = useState(defaultMagnitude);
  const [subject, setSubject] = useState('');
  const [selectAllSubjects, setSelectAllSubjects] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [selectedDataset, setSelectedDataset] = useState('');

  // Example options for columns and datasets
  const columns = ['Column A', 'Column B', 'Column C'];
  const datasets = ['Dataset 1', 'Dataset 2', 'Dataset 3'];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your search/filter logic here
    console.log({ threshold,spike,subject, selectAllSubjects, selectedColumn, selectedDataset });
  };

  return (
    <div>
      <h2>Plot Filter</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Threshold:</label>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            placeholder={`Default threshold (${defaultThreshold})`}
          />
        </div>
        <div>
          <label>Spikes:</label>
          <input
            type="number"
            value={spike}
            onChange={(e) => setSpike(e.target.value)}
            placeholder={`Default Spike (${defaultSpike})`}
          />
        </div>
        <div>
          <label>Magnitude:</label>
          <input
            type="number"
            value={magnitude}
            onChange={(e) => setMagnitude(e.target.value)}
            placeholder={`Default Magnitude (${defaultMagnitude})`}
          />
        </div>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject ID or name"
            disabled={selectAllSubjects}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={selectAllSubjects}
              onChange={(e) => setSelectAllSubjects(e.target.checked)}
            />
            Select All Subjects
          </label>
        </div>
        <div>
          <label>Column:</label>
          <select value={selectedColumn} onChange={(e) => setSelectedColumn(e.target.value)}>
            <option value="">Select Column</option>
            {columns.map(column => (
              <option key={column} value={column}>{column}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Dataset:</label>
          <select value={selectedDataset} onChange={(e) => setSelectedDataset(e.target.value)}>
            <option value="">Select Dataset</option>
            {datasets.map(dataset => (
              <option key={dataset} value={dataset}>{dataset}</option>
            ))}
          </select>
        </div>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default PlotFilterPage;
