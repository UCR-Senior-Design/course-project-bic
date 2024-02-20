import React from 'react';

// Import SVG images
import sub01ReconallImage from "../svg-images/sub-01_desc-reconall_T1w.svg";
import sub01DsegImage from "../svg-images/sub-01_dseg.svg";
import sub01SpaceImage from "../svg-images/sub-01_space-MNI152NLin2009cAsym_T1w.svg";
import sub01Carpetplot1Image from "../svg-images/sub-01_task-commpost_run-01_desc-carpetplot_bold.svg";
import sub01Compcorvar1Image from "../svg-images/sub-01_task-commpost_run-01_desc-compcorvar_bold.svg";
import sub01Confoundcorr1Image from "../svg-images/sub-01_task-commpost_run-01_desc-confoundcorr_bold.svg";
import sub01Rois1Image from "../svg-images/sub-01_task-commpost_run-01_desc-rois_bold.svg";
import sub01Carpetplot2Image from "../svg-images/sub-01_task-commpre_run-01_desc-carpetplot_bold.svg";
import sub01Compcorvar2Image from "../svg-images/sub-01_task-commpre_run-01_desc-compcorvar_bold.svg";
import sub01Confoundcorr2Image from "../svg-images/sub-01_task-commpre_run-01_desc-confoundcorr_bold.svg";
import sub01Coreg2Image from "../svg-images/sub-01_task-commpre_run-01_desc-coreg_bold.svg";
import sub01Rois2Image from "../svg-images/sub-01_task-commpre_run-01_desc-rois_bold.svg";
import sub01Carpetplot3Image from "../svg-images/sub-01_task-tv_run-01_desc-carpetplot_bold.svg";
import sub01Compcorvar3Image from "../svg-images/sub-01_task-tv_run-01_desc-compcorvar_bold.svg";
import sub01Confoundcorr3Image from "../svg-images/sub-01_task-tv_run-01_desc-confoundcorr_bold.svg";
import sub01Coreg3Image from "../svg-images/sub-01_task-tv_run-01_desc-coreg_bold.svg";
import sub01Rois3Image from "../svg-images/sub-01_task-tv_run-01_desc-rois_bold.svg";
import sub01Carpetplot4Image from "../svg-images/sub-01_task-tv_run-02_desc-carpetplot_bold.svg";
import sub01Compcorvar4Image from "../svg-images/sub-01_task-tv_run-02_desc-compcorvar_bold.svg";
import sub01Confoundcorr4Image from "../svg-images/sub-01_task-tv_run-02_desc-confoundcorr_bold.svg";
import sub01Coreg4Image from "../svg-images/sub-01_task-tv_run-02_desc-coreg_bold.svg";
import sub01Rois4Image from "../svg-images/sub-01_task-tv_run-02_desc-rois_bold.svg";
import sub01Carpetplot5Image from "../svg-images/sub-01_task-tv_run-03_desc-carpetplot_bold.svg";
import sub01Compcorvar5Image from "../svg-images/sub-01_task-tv_run-03_desc-compcorvar_bold.svg";
import sub01Confoundcorr5Image from "../svg-images/sub-01_task-tv_run-03_desc-confoundcorr_bold.svg";
import sub01Coreg5Image from "../svg-images/sub-01_task-tv_run-03_desc-coreg_bold.svg";
import sub01Rois5Image from "../svg-images/sub-01_task-tv_run-03_desc-rois_bold.svg";

const Spatial = () => {
  const images = [
    { image: sub01ReconallImage, name: "sub-01_desc-reconall_T1w" },
    { image: sub01DsegImage, name: "sub-01_dseg" },
    { image: sub01SpaceImage, name: "sub-01_space-MNI152NLin2009cAsym_T1w" },
    { image: sub01Carpetplot1Image, name: "sub-01_task-commpost_run-01_desc-carpetplot_bold" },
    { image: sub01Compcorvar1Image, name: "sub-01_task-commpost_run-01_desc-compcorvar_bold" },
    { image: sub01Confoundcorr1Image, name: "sub-01_task-commpost_run-01_desc-confoundcorr_bold" },
    { image: sub01Rois1Image, name: "sub-01_task-commpost_run-01_desc-rois_bold" },
    { image: sub01Carpetplot2Image, name: "sub-01_task-commpre_run-01_desc-carpetplot_bold" },
    { image: sub01Compcorvar2Image, name: "sub-01_task-commpre_run-01_desc-compcorvar_bold" },
    { image: sub01Confoundcorr2Image, name: "sub-01_task-commpre_run-01_desc-confoundcorr_bold" },
    { image: sub01Coreg2Image, name: "sub-01_task-commpre_run-01_desc-coreg_bold" },
    { image: sub01Rois2Image, name: "sub-01_task-commpre_run-01_desc-rois_bold" },
    { image: sub01Carpetplot3Image, name: "sub-01_task-tv_run-01_desc-carpetplot_bold" },
    { image: sub01Compcorvar3Image, name: "sub-01_task-tv_run-01_desc-compcorvar_bold" },
    { image: sub01Confoundcorr3Image, name: "sub-01_task-tv_run-01_desc-confoundcorr_bold" },
    { image: sub01Coreg3Image, name: "sub-01_task-tv_run-01_desc-coreg_bold" },
    { image: sub01Rois3Image, name: "sub-01_task-tv_run-01_desc-rois_bold" },
    { image: sub01Carpetplot4Image, name: "sub-01_task-tv_run-02_desc-carpetplot_bold" },
    { image: sub01Compcorvar4Image, name: "sub-01_task-tv_run-02_desc-compcorvar_bold" },
    { image: sub01Confoundcorr4Image, name: "sub-01_task-tv_run-02_desc-confoundcorr_bold" },
    { image: sub01Coreg4Image, name: "sub-01_task-tv_run-02_desc-coreg_bold" },
    { image: sub01Rois4Image, name: "sub-01_task-tv_run-02_desc-rois_bold" },
    { image: sub01Carpetplot5Image, name: "sub-01_task-tv_run-03_desc-carpetplot_bold" },
    { image: sub01Compcorvar5Image, name: "sub-01_task-tv_run-03_desc-compcorvar_bold" },
    { image: sub01Confoundcorr5Image, name: "sub-01_task-tv_run-03_desc-confoundcorr_bold" },
    { image: sub01Coreg5Image, name: "sub-01_task-tv_run-03_desc-coreg_bold" },
    { image: sub01Rois5Image, name: "sub-01_task-tv_run-03_desc-rois_bold" },
  ];

  return (
    <div className="mt-4">
      {images.map((imageObj, index) => (
        <div key={index} style={{ marginBottom: '45px' }}>
          <div className="fs-3 mb-2">
            <strong style={{ fontSize: '2rem' }}>{imageObj.name}</strong>
          </div>
          <div className="mt-4" style={{ overflow: 'hidden' }}>
            <img
              style={{ width: '100%', height: 'auto' }}
              className="rounded"
              src={imageObj.image}
              alt={`sub-${index + 1}_${imageObj.name}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Spatial;