import React from 'react';
import { MapInteractionCSS } from 'react-map-interaction';
import brainImage1 from "../svg-images/sub-01_dseg.svg";
import brainImage2 from "../svg-images/sub-02_dseg.svg";
import brainImage3 from "../svg-images/sub-03_dseg.svg";
import brainImage4 from "../svg-images/sub-04_dseg.svg";
import brainImage5 from "../svg-images/sub-05_dseg.svg";

const Mask = () => {
  const images = [brainImage1, brainImage2, brainImage3, brainImage4, brainImage5];

  return (
    <div className="mt-4">
      {images.map((image, index) => (
        <div key={index} className="mt-4">
          <div className="fs-5">Subject {index + 1}</div>
          <MapInteractionCSS disableZoom>
            <img style={{ width: '1000px', height: 'auto' }} className="rounded" src={image} alt={`brain${index + 1}`} />
          </MapInteractionCSS>
        </div>
      ))}
    </div>
  );
};

export default Mask;
