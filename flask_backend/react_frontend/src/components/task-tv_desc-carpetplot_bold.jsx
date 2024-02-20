// import React from 'react';
// import { MapInteractionCSS } from 'react-map-interaction';


// import brainImage1 from "../svg-images/sub-01_task-tv_run-01_desc-carpetplot_bold.svg";
// import brainImage11 from "../svg-images/sub-01_task-tv_run-02_desc-carpetplot_bold.svg";
// import brainImage12 from "../svg-images/sub-01_task-tv_run-03_desc-carpetplot_bold.svg";
// import brainImage2 from "../svg-images/sub-02_task-tv_run-01_desc-carpetplot_bold.svg";
// import brainImage21 from "../svg-images/sub-02_task-tv_run-02_desc-carpetplot_bold.svg";
// import brainImage22 from "../svg-images/sub-02_task-tv_run-03_desc-carpetplot_bold.svg";
// import brainImage3 from "../svg-images/sub-03_task-tv_run-01_desc-carpetplot_bold.svg";
// import brainImage31 from "../svg-images/sub-03_task-tv_run-02_desc-carpetplot_bold.svg";
// import brainImage32 from "../svg-images/sub-03_task-tv_run-03_desc-carpetplot_bold.svg";
// import brainImage4 from "../svg-images/sub-04_task-tv_run-01_desc-carpetplot_bold.svg";
// import brainImage41 from "../svg-images/sub-04_task-tv_run-02_desc-carpetplot_bold.svg";
// import brainImage42 from "../svg-images/sub-04_task-tv_run-03_desc-carpetplot_bold.svg";
// import brainImage5 from "../svg-images/sub-05_task-tv_run-01_desc-carpetplot_bold.svg";
// import brainImage51 from "../svg-images/sub-05_task-tv_run-02_desc-carpetplot_bold.svg";
// import brainImage52 from "../svg-images/sub-05_task-tv_run-03_desc-carpetplot_bold.svg";

// const CarpetPlot2 = () => {
//   const images = [brainImage1, brainImage11, brainImage12, brainImage2, brainImage21, brainImage22, brainImage3, brainImage31, brainImage32, brainImage4, brainImage41, brainImage42, brainImage5, brainImage51, brainImage52];

//   return (
//     <div className="mt-4">
//       {images.map((image, index) => (
//         <div key={index}>
//           <div className="fs-3 mb-2">
//             <strong>Subject {index + 1}</strong>
//           </div>
//           <div className="mt-4">
//             <MapInteractionCSS>
//               <img width="100%" className="rounded" src={image} alt={`brain${index + 1}`} />
//             </MapInteractionCSS>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CarpetPlot2;

import React from 'react';
import { MapInteractionCSS } from 'react-map-interaction';

// Import SVG images
import brainImage1 from "../svg-images/sub-01_task-tv_run-01_desc-carpetplot_bold.svg";
import brainImage11 from "../svg-images/sub-01_task-tv_run-02_desc-carpetplot_bold.svg";
import brainImage12 from "../svg-images/sub-01_task-tv_run-03_desc-carpetplot_bold.svg";
import brainImage2 from "../svg-images/sub-02_task-tv_run-01_desc-carpetplot_bold.svg";
import brainImage21 from "../svg-images/sub-02_task-tv_run-02_desc-carpetplot_bold.svg";
import brainImage22 from "../svg-images/sub-02_task-tv_run-03_desc-carpetplot_bold.svg";
import brainImage3 from "../svg-images/sub-03_task-tv_run-01_desc-carpetplot_bold.svg";
import brainImage31 from "../svg-images/sub-03_task-tv_run-02_desc-carpetplot_bold.svg";
import brainImage32 from "../svg-images/sub-03_task-tv_run-03_desc-carpetplot_bold.svg";
import brainImage4 from "../svg-images/sub-04_task-tv_run-01_desc-carpetplot_bold.svg";
import brainImage41 from "../svg-images/sub-04_task-tv_run-02_desc-carpetplot_bold.svg";
import brainImage42 from "../svg-images/sub-04_task-tv_run-03_desc-carpetplot_bold.svg";
import brainImage5 from "../svg-images/sub-05_task-tv_run-01_desc-carpetplot_bold.svg";
import brainImage51 from "../svg-images/sub-05_task-tv_run-02_desc-carpetplot_bold.svg";
import brainImage52 from "../svg-images/sub-05_task-tv_run-03_desc-carpetplot_bold.svg";

const CarpetPlot2 = () => {
  const images = [
    { subject: 1, run: 1, image: brainImage1 },
    { subject: 1, run: 2, image: brainImage11 },
    { subject: 1, run: 3, image: brainImage12 },
    { subject: 2, run: 1, image: brainImage2 },
    { subject: 2, run: 2, image: brainImage21 },
    { subject: 2, run: 3, image: brainImage22 },
    { subject: 3, run: 1, image: brainImage3 },
    { subject: 3, run: 2, image: brainImage31 },
    { subject: 3, run: 3, image: brainImage32 },
    { subject: 4, run: 1, image: brainImage4 },
    { subject: 4, run: 2, image: brainImage41 },
    { subject: 4, run: 3, image: brainImage42 },
    { subject: 5, run: 1, image: brainImage5 },
    { subject: 5, run: 2, image: brainImage51 },
    { subject: 5, run: 3, image: brainImage52 },
  ];

//   return (
//     <div className="mt-4">
//       {images.map(({ subject, run, image }, index) => (
//         <div key={index}>
//           {run === 1 && <div className="fs-3 mb-2">Subject {subject}</div>}
//           {run > 1 && <div className="fs-5 mb-2">Run {run}</div>}
//           <div className="mt-4">
//             <MapInteractionCSS>
//               <img width="100%" className="rounded" src={image} alt={`brain${index + 1}`} />
//             </MapInteractionCSS>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

return (
    <div className="mt-4">
      {images.map(({ subject, run, image }, index) => (
        <div key={index}>
          {run === 1 && <div className="fs-3 mb-2">Subject {subject}</div>}
          <div className="fs-5 mb-2">Run {run}</div>
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

export default CarpetPlot2;
