import React from 'react';

const Plot = ({ plots }) => {
  return (
    <div>
      <h2>Plots</h2>
      <div>
        {Object.entries(plots).map(([key, src]) => (
          <img key={key} src={src} alt={`${key} plot`} />
        ))}
      </div>
    </div>
  );
};

export default Plot;