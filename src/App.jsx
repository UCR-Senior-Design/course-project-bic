import { useEffect, useState } from "react";
import reactLogo from './assets/react.svg';
import './App.css';
import Brain from "./components/desc_reconall_T1w";
import Spatial from "./components/task-commpost_run-01_desc-carpetplot_bold";
import Surface from "./components/task-commpost_run-01_desc-compcorvar_bold";
import Alignment from "./components/space-MNI152NLin2009cAsym_T1w";
import Mask from "./components/dseg";
// import Plot from "./components/Plot";

export default function App() {
  const [data, setData] = useState("selectTheData");

  const [brainContentVisible, setBrainContentVisible] = useState(false);
  const [spatialContentVisible, setSpatialContentVisible] = useState(false);
  const [surfaceContentVisible, setSurfaceContentVisible] = useState(false);
  const [alignmentContentVisible, setAlignmentContentVisible] = useState(false);
  const [maskContentVisible, setMaskContentVisible] = useState(false);

  useEffect(() => {
    setBrainContentVisible(data === "desc_reconall_T1w");
    setSpatialContentVisible(data === "task-commpost_run-01_desc-carpetplot_bold");
    setSurfaceContentVisible(data === "task-commpost_run-01_desc-compcorvar_bold");
    setAlignmentContentVisible(data === "space-MNI152NLin2009cAsym_T1w");
    setMaskContentVisible(data === "dseg");
  }, [data]);

  const handleOnChange = (e) => {
    setData(e.target.value);
  };

  const makeFirstLetterCapital = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const renderResult = () => {
    return data === "selectTheData" ? "fMRIPrep Data Outputs" : makeFirstLetterCapital(data);
  };

  return (
    <div className="container mt-3">
      <div>
        <h1> {renderResult()}</h1>
      </div>
      <div className="mt-4">
        <select className="form-select" value={data} onChange={handleOnChange}>
          <option value="selectTheData">Select your choice of data</option>
          <option value="desc_reconall_T1w">desc_reconall_T1w</option>
          <option value="task-commpost_run-01_desc-carpetplot_bold">task-commpost_run-01_desc-carpetplot_bold</option>
          <option value="task-commpost_run-01_desc-compcorvar_bold">task-commpost_run-01_desc-compcorvar_bold</option>
          <option value="space-MNI152NLin2009cAsym_T1w">space-MNI152NLin2009cAsym_T1w</option>
          <option value="dseg">dseg</option>
        </select>
      </div>
      {brainContentVisible && <Brain />}
      {spatialContentVisible && <Spatial />}
      {surfaceContentVisible && <Surface />}
      {alignmentContentVisible && <Alignment />}
      {maskContentVisible && <Mask />}
    </div>
  );
}
