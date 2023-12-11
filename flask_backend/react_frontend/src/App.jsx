import { useEffect, useState } from "react";
import reactLogo from './assets/react.svg';
import './App.css';
import Brain from "./components/Brain";
import Spatial from "./components/Spatial";
import Surface from "./components/Surface";
import Alignment from "./components/Alignment";
import Mask from "./components/Mask";
import GraphSelector from './components/Visualizations';
import Visualization_Component from './components/Visualization_Component';
import Selector_Visualization from './components/Selector_Visualizations';
export default function App() {
  const [data, setData] = useState("selectTheData");

  const[brainContentVisible, setBrainContentVisible] = useState(false);
  const[spatialContentVisible, setSpatialContentVisible] = useState(false);
  const[surfaceContentVisible, setSurfaceContentVisible] = useState(false);
  const[alignmentContentVisible, setAlignmentContentVisible] = useState(false);
  const[maskContentVisible, setMaskContentVisible] = useState(false);

  useEffect(() => {
    data === "brain mask and brain tissue segmentation of the T1w"
      ? setBrainContentVisible(true)
      : setBrainContentVisible(false);
    data === "spatial normalization of the anatomical T1w reference" ? setSpatialContentVisible(true) : setSpatialContentVisible(false);
    data === "surface reconstruction" ? setSurfaceContentVisible(true) : setSurfaceContentVisible(false);
    data === "alignment of functional and anatomical MRI data (surface driven)" ? setAlignmentContentVisible(true) : setAlignmentContentVisible(false);
    data === "brain mask and (anatomical/crown/temporal) CompCor ROIs" ? setMaskContentVisible(true) : setMaskContentVisible(false);
  }, [data]);
  
  const handleOnChange = (e) => {
    setData(e.target.value);
  };

  const makeFirstLetterCapital = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const renderResult = () => {
    let result;
    data === "selectTheData"
      ? (result = "fMRIPrep Data Outputs")
      : (result = makeFirstLetterCapital(data));
    return result;
  };

  const handleGraphSelect = (selectedSection) => {
    // Perform actions with the selected section (e.g., make a request to the backend)
    console.log(`Selected section: ${selectedSection}`);
  };

  return (
    <div className="container mt-3">
      <div>
        <h1> {renderResult()}</h1>
      </div>
      <div className="mt-4">
        <select className="form-select" value={data} onChange={handleOnChange}> 
        <option value="selectTheData">Select your choice of data</option>
        <option value="brain mask and brain tissue segmentation of the T1w">
          Brain mask and brain tissue segmentation of the T1w
        </option>
        <option value="spatial normalization of the anatomical T1w reference">
          Spatial normalization of the anatomical T1w reference
        </option>
        <option value="surface reconstruction">Surface reconstruction</option>
        <option value="alignment of functional and anatomical MRI data (surface driven)">
          Alignment of functional and anatomical MRI data (surface driven)
        </option>
        <option value="brain mask and (anatomical/crown/temporal) CompCor ROIs">
          Brain mask and (anatomical/crown/temporal) CompCor ROIs
        </option>

        </select>
      </div>
      {brainContentVisible && <Brain />}
      {spatialContentVisible && <Spatial />}
      {surfaceContentVisible && <Surface />}
      {alignmentContentVisible && <Alignment />}
      {maskContentVisible && <Mask />}
     {/*<div> 
      <h1>Graph Application</h1>
      <GraphSelector onGraphSelect={handleGraphSelect} />
      {/* Other components and content */}
  <div>
    <Visualization_Component/>
  </div>
  <div>
    <Selector_Visualization/>
  </div>
    </div>
    
  );
  }

 