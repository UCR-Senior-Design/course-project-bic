import React from 'react';
import { MapInteractionCSS } from 'react-map-interaction';
import brainImage1 from "../svg-images/sub-01_space-MNI152NLin2009cAsym_T1w.svg";
import brainImage2 from "../svg-images/sub-02_space-MNI152NLin2009cAsym_T1w.svg";
import brainImage3 from "../svg-images/sub-03_space-MNI152NLin2009cAsym_T1w.svg";
import brainImage4 from "../svg-images/sub-04_space-MNI152NLin2009cAsym_T1w.svg";
import brainImage5 from "../svg-images/sub-05_space-MNI152NLin2009cAsym_T1w.svg";

const Align = () => {
  const images = [brainImage1, brainImage2, brainImage3, brainImage4, brainImage5];

  return (
    <div className="mt-4">
      {images.map((image, index) => (
        <div key={index}>
          <div className="fs-3 mb-2">
            <strong>Subject {index + 1}</strong>
          </div>
          <div className="mt-4">
            <MapInteractionCSS disableZoom>
              <img style={{ width: '1000px', height: 'auto' }} className="rounded" src={image} alt={`brain${index + 1}`} />
            </MapInteractionCSS>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Align;

