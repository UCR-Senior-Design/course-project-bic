import React from 'react';

// Import SVG images
import brainImage1 from "../svg-images/sub-01_task-commpost_run-01_desc-carpetplot_bold.svg";
import brainImage2 from "../svg-images/sub-02_task-commpost_run-01_desc-carpetplot_bold.svg";
import brainImage3 from "../svg-images/sub-03_task-commpost_run-01_desc-carpetplot_bold.svg";
import brainImage4 from "../svg-images/sub-04_task-commpost_run-01_desc-carpetplot_bold.svg";
import brainImage5 from "../svg-images/sub-05_task-commpost_run-01_desc-carpetplot_bold.svg";

const Spatial = () => {
  return (
    <div className="mt-4">
      {/* Subject 1 */}
      <div className="fs-3 mb-2">
        <strong>Subject 1</strong>
      </div>
      <div className="mt-4">
        <img width="40%" className="rounded" src={brainImage1} alt="brain1" />
      </div>

      {/* Subject 2 */}
      <div className="fs-3 mt-4 mb-2">
        <strong>Subject 2</strong>
      </div>
      <div className="mt-4">
        <img width="40%" className="rounded" src={brainImage2} alt="brain2" />
      </div>

      {/* Subject 3 */}
      <div className="fs-3 mt-4 mb-2">
        <strong>Subject 3</strong>
      </div>
      <div className="mt-4">
        <img width="40%" className="rounded" src={brainImage3} alt="brain3" />
      </div>

      {/* Subject 4 */}
      <div className="fs-3 mt-4 mb-2">
        <strong>Subject 4</strong>
      </div>
      <div className="mt-4">
        <img width="40%" className="rounded" src={brainImage4} alt="brain4" />
      </div>

      {/* Subject 5 */}
      <div className="fs-3 mt-4 mb-2">
        <strong>Subject 5</strong>
      </div>
      <div className="mt-4">
        <img width="40%" className="rounded" src={brainImage5} alt="brain5" />
      </div>
    </div>
  );
};

export default Spatial;
