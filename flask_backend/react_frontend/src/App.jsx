// import React, { useEffect, useState } from "react";
// import { BarChartOutlined, UserOutlined, PictureOutlined } from '@ant-design/icons';
// import { Menu, Switch } from 'antd';
// import './App.css';
// import Brain from "./components/desc_reconall_T1w";
// import Spatial from "./components/task-commpost_run-01_desc-carpetplot_bold";
// import Surface from "./components/task-commpost_run-01_desc-compcorvar_bold";
// import Alignment from "./components/space-MNI152NLin2009cAsym_T1w";
// import Mask from "./components/dseg";
// import Confound from "./components/task-commpost_run-01_desc-confoundcorr_bold";
// import Rois from "./components/task-commpost_run-01_desc-rois_bold";
// import CarpetPlot from "./components/task-commpre_run-01_desc-carpetplot_bold"; // Added CarpetPlot component
// import Visualization_Component from './components/Visualization_Component';
// import Selector_Visualizations from './components/Selector_Visualizations';


// export default function App() {

//   const [data, setData] = useState("selectTheData");

//   const [brainContentVisible, setBrainContentVisible] = useState(false);
//   const [spatialContentVisible, setSpatialContentVisible] = useState(false);
//   const [surfaceContentVisible, setSurfaceContentVisible] = useState(false);
//   const [alignmentContentVisible, setAlignmentContentVisible] = useState(false);
//   const [maskContentVisible, setMaskContentVisible] = useState(false);
//   const [confoundContentVisible, setConfoundContentVisible] = useState(false);
//   const [roisContentVisible, setRoisContentVisible] = useState(false);
//   const [carpetPlotContentVisible, setCarpetPlotContentVisible] = useState(false); // Added state for CarpetPlot component

//   useEffect(() => {
//     setBrainContentVisible(data === "desc_reconall_T1w");
//     setSpatialContentVisible(data === "task-commpost_run-01_desc-carpetplot_bold");
//     setSurfaceContentVisible(data === "task-commpost_run-01_desc-compcorvar_bold");
//     setAlignmentContentVisible(data === "space-MNI152NLin2009cAsym_T1w");
//     setMaskContentVisible(data === "dseg");
//     setConfoundContentVisible(data === "task-commpost_run-01_desc-confoundcorr_bold");
//     setRoisContentVisible(data === "task-commpost_run-01_desc-rois_bold");
//     setCarpetPlotContentVisible(data === "task-commpre_run-01_desc-carpetplot_bold"); // Added condition for CarpetPlot component
//   }, [data]);

//   const handleOnChange = (e) => {
//     setData(e.target.value);
//   };

//   const makeFirstLetterCapital = (str) => {
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   };

//   const renderResult = () => {
//     return data === "selectTheData" ? "fMRIPrep Data Outputs" : makeFirstLetterCapital(data);
//   };
//   const [plots, setPlots] = useState({});
//   const handlePlotsGenerated = (generatedPlots) => {
//       setPlots(generatedPlots);
//   };

//   return (
//     <div className="container mt-3">
//       <div>
//         <h1> {renderResult()}</h1>
//       </div>
//       <div className="mt-4">
//         <select className="form-select" value={data} onChange={handleOnChange}>
//           <option value="selectTheData">Select your choice of data</option>
//           <option value="desc_reconall_T1w">desc_reconall_T1w</option>
//           <option value="task-commpost_run-01_desc-carpetplot_bold">task-commpost_run-01_desc-carpetplot_bold</option>
//           <option value="task-commpost_run-01_desc-compcorvar_bold">Surface reconstruction</option>
//           <option value="space-MNI152NLin2009cAsym_T1w">space-MNI152NLin2009cAsym_T1w</option>
//           <option value="dseg">dseg</option>
//           <option value="task-commpost_run-01_desc-confoundcorr_bold">Confound correction</option>
//           <option value="task-commpost_run-01_desc-rois_bold">Rois</option>
//           <option value="task-commpre_run-01_desc-carpetplot_bold">CarpetPlot</option> {/* Added CarpetPlot option */}
//         </select>
//       </div>
//       {brainContentVisible && <Brain />}
//       {spatialContentVisible && <Spatial />}
//       {surfaceContentVisible && <Surface />}
//       {alignmentContentVisible && <Alignment />}
//       {maskContentVisible && <Mask />}
//       {confoundContentVisible && <Confound />}
//       {roisContentVisible && <Rois />}
//       {carpetPlotContentVisible && <CarpetPlot />} {/* Added CarpetPlot component */}

//     <div>
//     <Visualization_Component/>
//   </div>
  
//     </div>

//   );

// }

//OG CODE
// import React, { useEffect, useState } from "react";
// import { BarChartOutlined, UserOutlined, PictureOutlined } from '@ant-design/icons';
// import { Menu } from 'antd';
// import './index.css';
// import './App.css';

// import Brain from "./components/desc_reconall_T1w";
// import Spatial from "./components/task-commpost_run-01_desc-carpetplot_bold";
// import Surface from "./components/task-commpost_run-01_desc-compcorvar_bold";
// import Alignment from "./components/space-MNI152NLin2009cAsym_T1w";
// import Mask from "./components/dseg";
// import Confound from "./components/task-commpost_run-01_desc-confoundcorr_bold";
// import Rois from "./components/task-commpost_run-01_desc-rois_bold";
// import CarpetPlot from "./components/task-commpre_run-01_desc-carpetplot_bold";

// const App = () => {
//   const [current, setCurrent] = useState('1');
//   const [selectedComponent, setSelectedComponent] = useState(null);

//   const items = [
//     {
//       key: 'sub1',
//       icon: <UserOutlined />,
//       label: 'Subjects',
//       children: [
//         { key: '1', label: 'Subject 1' },
//         { key: '2', label: 'Subject 2' },
//         { key: '3', label: 'Subject 3' },
//         { key: '4', label: 'Subject 4' },
//         { key: '5', label: 'Subject 5' },
//         { key: '6', label: 'Subject 6' },
//         { key: '7', label: 'Subject 7' },
//         { key: '8', label: 'Subject 8' },
//         { key: '9', label: 'Subject 9' },
//         { key: '10', label: 'Subject 10' },
//       ],
//     },
//     {
//       key: 'sub2',
//       icon: <BarChartOutlined />,
//       label: 'Plots (All Subjects)',
//       children: [
//         { key: '11', label: 'Framewise Plot' },
//         { key: '12', label: 'Rotations Plot' },
//         { key: '13', label: 'Translations Plot' },
//         { key: 'sub3', label: 'Submenu', children: [
//           { key: '14', label: 'Option 1' },
//           { key: '15', label: 'Option 2' },
//         ]},
//       ],
//     },
//     {
//       key: 'sub4',
//       icon: <PictureOutlined />,
//       label: 'Figures (All Subjects)',
//       children: [
//         { key: '16', label: 'desc_reconall_T1w', component: <Brain /> },
//         { key: '17', label: 'task-commpost_run-01_desc-carpetplot_bold', component: <Spatial /> },
//         { key: '18', label: 'Surface reconstruction', component: <Surface /> },
//         { key: '19', label: 'space-MNI152NLin2009cAsym_T1w', component: <Alignment /> },
//         { key: '20', label: 'dseg', component: <Mask /> },
//         { key: '21', label: 'Confound correction', component: <Confound /> },
//         { key: '22', label: 'Rois', component: <Rois /> },
//         { key: '23', label: 'Carpet Plot', component: <CarpetPlot /> },
//       ],
//     },
//   ];

//   const onClick = (e) => {
//     setCurrent(e.key);
//     const selectedItem = items.flatMap(item => item.children).find(item => item.key === e.key);
//     if (selectedItem && selectedItem.component) {
//       setSelectedComponent(selectedItem.component);
//     }
//   };

//   return (
    
//     <div className="container">
//       <Menu
//         className="custom-menu"
//         onClick={onClick}
//         style={{
//           width: 256,
//           position: 'absolute',
//           left: 0,
//           top: '0px',
//         }}
//         defaultOpenKeys={['sub1']}
//         selectedKeys={[current]}
//         mode="inline"
//         items={items}
//       />
//       {selectedComponent}
//     </div>
//   );
// };

// export default App;


// import React, { useEffect, useState } from "react";
// import { BarChartOutlined, UserOutlined, PictureOutlined } from '@ant-design/icons';
// import { Menu } from 'antd';
// import './index.css';
// import './App.css';

// import Brain from "./components/desc_reconall_T1w";
// import Spatial from "./components/task-commpost_run-01_desc-carpetplot_bold";
// import Surface from "./components/task-commpost_run-01_desc-compcorvar_bold";
// import Alignment from "./components/space-MNI152NLin2009cAsym_T1w";
// import Mask from "./components/dseg";
// import Confound from "./components/task-commpost_run-01_desc-confoundcorr_bold";
// import Rois from "./components/task-commpost_run-01_desc-rois_bold";
// import CarpetPlot from "./components/task-commpre_run-01_desc-carpetplot_bold";

// const Header = () => {
//   return (
//     <div className="header">
//       <h1 className="title">fMRI Data Outputs</h1>
//       <div className="navigation">
//         <a href="/" className="home-link">Home</a>
//         <a href="/" className="about-link">About</a>
//         <button className="login-button">Login</button>
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   const [current, setCurrent] = useState('1');
//   const [selectedComponent, setSelectedComponent] = useState(null);

//   const items = [
//     {
//             key: 'sub1',
//             icon: <UserOutlined />,
//             label: 'Subjects',
//             children: [
//               { key: '1', label: 'Subject 1' },
//               { key: '2', label: 'Subject 2' },
//               { key: '3', label: 'Subject 3' },
//               { key: '4', label: 'Subject 4' },
//               { key: '5', label: 'Subject 5' },
//               { key: '6', label: 'Subject 6' },
//               { key: '7', label: 'Subject 7' },
//               { key: '8', label: 'Subject 8' },
//               { key: '9', label: 'Subject 9' },
//               { key: '10', label: 'Subject 10' },
//             ],
//           },
//           {
//             key: 'sub2',
//             icon: <BarChartOutlined />,
//             label: 'Plots (All Subjects)',
//             children: [
//               { key: '11', label: 'Framewise Plot' },
//               { key: '12', label: 'Rotations Plot' },
//               { key: '13', label: 'Translations Plot' },
//               { key: 'sub3', label: 'Submenu', children: [
//                 { key: '14', label: 'Option 1' },
//                 { key: '15', label: 'Option 2' },
//               ]},
//             ],
//           },
//           {
//             key: 'sub4',
//             icon: <PictureOutlined />,
//             label: 'Figures (All Subjects)',
//             children: [
//               { key: '16', label: 'desc_reconall_T1w', component: <Brain /> },
//               { key: '17', label: 'task-commpost_run-01_desc-carpetplot_bold', component: <Spatial /> },
//               { key: '18', label: 'Surface reconstruction', component: <Surface /> },
//               { key: '19', label: 'space-MNI152NLin2009cAsym_T1w', component: <Alignment /> },
//               { key: '20', label: 'dseg', component: <Mask /> },
//               { key: '21', label: 'Confound correction', component: <Confound /> },
//               { key: '22', label: 'Rois', component: <Rois /> },
//               { key: '23', label: 'Carpet Plot', component: <CarpetPlot /> },
//             ],
//           },
//         ];

//   const onClick = (e) => {
//     setCurrent(e.key);
//     const selectedItem = items.flatMap(item => item.children).find(item => item.key === e.key);
//     if (selectedItem && selectedItem.component) {
//       setSelectedComponent(selectedItem.component);
//     }
//   };

//   return (
//     <div className="app">
//       <Header />
//       <div className="container">
//         <Menu
//           className="custom-menu"
//           onClick={onClick}
//           style={{
//             width: 256,
//             position: 'absolute',
//             left: 0,
//             top: '0px',
//           }}
//           defaultOpenKeys={['sub1']}
//           selectedKeys={[current]}
//           mode="inline"
//           items={items}
//         />
//         {selectedComponent}
//       </div>
//     </div>
//   );
// };

// export default App;


//good
// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
// import { BarChartOutlined, UserOutlined, PictureOutlined } from '@ant-design/icons';
// import { Menu } from 'antd';
// import './index.css';
// import './App.css';
// import logoImg from './logo1.jpg'; //logo pic
// import Home from './components/Home';
// import About from './components/About';


// import Brain from "./components/desc_reconall_T1w";
// import Spatial from "./components/task-commpost_run-01_desc-carpetplot_bold";
// import Surface from "./components/task-commpost_run-01_desc-compcorvar_bold";
// import Alignment from "./components/space-MNI152NLin2009cAsym_T1w";
// import Mask from "./components/dseg";
// import Confound from "./components/task-commpost_run-01_desc-confoundcorr_bold";
// import Rois from "./components/task-commpost_run-01_desc-rois_bold";
// import CarpetPlot from "./components/task-commpre_run-01_desc-carpetplot_bold";
// import CarpetPlot2 from "./components/task-tv_desc-carpetplot_bold";
// import CompcorvarTv from "./components/task-tv_desc-compcorvar_bold";
// import ConfoundcorrTv from "./components/task-tv_desc-confoundcorr_bold";
// import CoregTv from "./components/task-tv_desc-coreg_bold";
// import Sub1 from "./components/sub-01";
// import Sub2 from "./components/sub-02";
// import Sub3 from "./components/sub-03";
// import Sub4 from "./components/sub-04";
// import Sub5 from "./components/sub-05";
// import Plot_Filter from "./components/Plot_Filter";

// import Visualization_Component from './components/Visualization_Component';
//  import Visualization_Component2 from './components/Visualization_Component2';

// const Header = () => {
//   return (
//     // <Router>
//     // <div className="header">
//     //   <div className="logo">
//     //   <img src={logoImg} className="logo-img" />
//     //   </div>
//     //   <h1 className="title">fMRI Data Outputs</h1>
//     //   <div className="navigation">
//     //   <input type="text" placeholder="Search..." className="search-bar" />
        
//     //     <a href="/" className="home-link">Home</a>
//     //     <a href="/" className="about-link">About</a>
//     //   </div>
//     // </div>
//     // </Router>

//     <div className="header">
//     <h1>My Website</h1>
//     <nav>
//       <ul>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/about">About</Link></li>
//       </ul>
//     </nav>
//   </div>

//   );
// };

// const App = () => {
//   const [current, setCurrent] = useState('1');
//   const [selectedComponent, setSelectedComponent] = useState(null);
//   const [showAboutDescription, setShowAboutDescription] = useState(false);

//   const items = [
//     {
//                   key: 'sub1',
//                   icon: <UserOutlined />,
//                   label: 'Subjects',
//                   children: [
//                     { key: '1', label: 'Subject 1', component: <Sub1 /> },
//                     { key: '2', label: 'Subject 2', component: <Sub2 /> },
//                     { key: '3', label: 'Subject 3', component: <Sub3 /> },
//                     { key: '4', label: 'Subject 4', component: <Sub4 /> },
//                     { key: '5', label: 'Subject 5', component: <Sub5 /> },
//                     { key: '6', label: 'Subject 6' },
//                     { key: '7', label: 'Subject 7' },
//                     { key: '8', label: 'Subject 8' },
//                     { key: '9', label: 'Subject 9' },
//                     { key: '10', label: 'Subject 10' },
//                   ],
//                 },
//                 {
//                   key: 'sub2',
//                   icon: <BarChartOutlined />,
//                   label: 'Visualizations',
//                   children: [
//                     { key: '11', label: 'Plot Filter' , component:<Plot_Filter />},
//                     { key: '12', label: 'Thresholds/Spikes' , component:<Visualization_Component/>},
//                     { key: '112', label: 'Reg_plots' , component:<Visualization_Component2/>},
//                     { key: '13', label: 'Plots (All Subjects)', children: [
//                       { key: '14', label: 'Sub-01' , component:<Visualization_Component2/>},
//                       { key: '15', label: 'Sub-01-thres' },
//                     ]},
//                   ],
//                 },
//                 {
//                   key: 'sub4',
//                   icon: <PictureOutlined />,
//                   label: 'Figures (All Subjects)',
//                   children: [
//                     { key: '16', label: 'desc_reconall_T1w', component: <Brain /> },
//                     { key: '17', label: 'task-commpost_desc-carpetplot_bold', component: <Spatial /> },
//                     { key: '18', label: 'Surface reconstruction', component: <Surface /> },
//                     { key: '19', label: 'space-MNI152NLin2009cAsym_T1w', component: <Alignment /> },
//                     { key: '20', label: 'dseg', component: <Mask /> },
//                     { key: '21', label: 'task-commpost_desc-confoundcorr_bold.svg', component: <Confound /> },
//                     { key: '22', label: 'task-commpost_desc-rois_bold.svg', component: <Rois /> },
//                     { key: '23', label: 'task-commpre_desc-carpetplot_bold.svg', component: <CarpetPlot /> },
//                     { key: '24', label: 'task-tv_desc-carpetplot_bold', component: <CarpetPlot2 /> },
//                     { key: '25', label: 'task-tv_desc-compcorvar_bold', component: <CompcorvarTv /> },
//                     { key: '26', label: 'task-tv_desc-confoundcorr_bold', component: <ConfoundcorrTv /> },
//                     { key: '27', label: 'task-tv_desc-coreg_bold', component: <CoregTv /> },
//                   ],
//                 },
//               ];

//               const onClick = (e) => {
//                 setCurrent(e.key);
//                 const selectedItem = items.flatMap(item => item.children).find(item => item.key === e.key);
//                 if (selectedItem && selectedItem.component) {
//                   setSelectedComponent(selectedItem.component);
//                 }
                
//                 // check if "About" link is clicked
//                 if (e.key === 'sub2') { 
//                   setShowAboutDescription(true);
//                 } else {
//                   setShowAboutDescription(false);
//                 }
//               };
              

//   return (
//     <Router>
//     <div className="App">
//       <Header />
//       <Switch>
//         <Route exact path="/" component={Home} />
//         <Route path="/about" component={About} />
//       </Switch>
//     </div>
//   </Router>

//     <div className="app">
//       <Header />
//       <div className="container">
//         <Menu
//           className="custom-menu"
//           onClick={onClick}
//           style={{
//             width: 256,
//             position: 'absolute',
//             left: 0,
//             top: '0px',
//           }}
//           defaultOpenKeys={['sub1']}
//           selectedKeys={[current]}
//           mode="inline"
//           items={items}
//         />
//         {showAboutDescription && (
//           <div className="about-description">
//             <p>sample description. - testing</p>
//           </div>
//         )}
//         {selectedComponent}
//       </div>
//     </div>
//   );
// };

// export default App;



import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BarChartOutlined, UserOutlined, PictureOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import './index.css';
import './App.css';
import logoImg from './logo1.jpg'; //logo pic
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import About from "./components/About";



import Brain from "./components/desc_reconall_T1w";
import Spatial from "./components/task-commpost_run-01_desc-carpetplot_bold";
import Surface from "./components/task-commpost_run-01_desc-compcorvar_bold";
import Alignment from "./components/space-MNI152NLin2009cAsym_T1w";
import Mask from "./components/dseg";
import Confound from "./components/task-commpost_run-01_desc-confoundcorr_bold";
import Rois from "./components/task-commpost_run-01_desc-rois_bold";
import CarpetPlot from "./components/task-commpre_run-01_desc-carpetplot_bold";
import CarpetPlot2 from "./components/task-tv_desc-carpetplot_bold";
import CompcorvarTv from "./components/task-tv_desc-compcorvar_bold";
import ConfoundcorrTv from "./components/task-tv_desc-confoundcorr_bold";
import CoregTv from "./components/task-tv_desc-coreg_bold";
import Sub1 from "./components/sub-01";
import Sub2 from "./components/sub-02";
import Sub3 from "./components/sub-03";
import Sub4 from "./components/sub-04";
import Sub5 from "./components/sub-05";
import Plot_Filter from "./components/Plot_Filter";

import Visualization_Component from './components/Visualization_Component';
 import Visualization_Component2 from './components/Visualization_Component2';

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
      <img src={logoImg} className="logo-img" />
      </div>
      <h1 className="title">fMRI Data Outputs</h1>
      <div className="navigation">
      <input type="text" placeholder="Search..." className="search-bar" />
        
      <a href="/welcome" className="welcome-link">Welcome</a>
      <a href="/home" className="home-link">Home</a>
      <a href="/about" className="about-link">About</a>
      </div>
    </div>
  );
};

const App = () => {
  const [current, setCurrent] = useState('1');
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showAboutDescription, setShowAboutDescription] = useState(false);

  const items = [
    {
                  key: 'sub1',
                  icon: <UserOutlined />,
                  label: 'Subjects',
                  children: [
                    { key: '1', label: 'Subject 1', component: <Sub1 /> },
                    { key: '2', label: 'Subject 2', component: <Sub2 /> },
                    { key: '3', label: 'Subject 3', component: <Sub3 /> },
                    { key: '4', label: 'Subject 4', component: <Sub4 /> },
                    { key: '5', label: 'Subject 5', component: <Sub5 /> },
                    { key: '6', label: 'Subject 6' },
                    { key: '7', label: 'Subject 7' },
                    { key: '8', label: 'Subject 8' },
                    { key: '9', label: 'Subject 9' },
                    { key: '10', label: 'Subject 10' },
                  ],
                },
                {
                  key: 'sub2',
                  icon: <BarChartOutlined />,
                  label: 'Visualizations',
                  children: [
                    { key: '11', label: 'Plot Filter' , component:<Plot_Filter />},
                    { key: '12', label: 'Thresholds/Spikes' , component:<Visualization_Component/>},
                    { key: '112', label: 'Reg_plots' , component:<Visualization_Component2/>},
                    { key: '13', label: 'Plots (All Subjects)', children: [
                      { key: '14', label: 'Sub-01' , component:<Visualization_Component2/>},
                      { key: '15', label: 'Sub-01-thres' },
                    ]},
                  ],
                },
                {
                  key: 'sub4',
                  icon: <PictureOutlined />,
                  label: 'Figures (All Subjects)',
                  children: [
                    { key: '16', label: 'desc_reconall_T1w', component: <Brain /> },
                    { key: '17', label: 'task-commpost_desc-carpetplot_bold', component: <Spatial /> },
                    { key: '18', label: 'Surface reconstruction', component: <Surface /> },
                    { key: '19', label: 'space-MNI152NLin2009cAsym_T1w', component: <Alignment /> },
                    { key: '20', label: 'dseg', component: <Mask /> },
                    { key: '21', label: 'task-commpost_desc-confoundcorr_bold.svg', component: <Confound /> },
                    { key: '22', label: 'task-commpost_desc-rois_bold.svg', component: <Rois /> },
                    { key: '23', label: 'task-commpre_desc-carpetplot_bold.svg', component: <CarpetPlot /> },
                    { key: '24', label: 'task-tv_desc-carpetplot_bold', component: <CarpetPlot2 /> },
                    { key: '25', label: 'task-tv_desc-compcorvar_bold', component: <CompcorvarTv /> },
                    { key: '26', label: 'task-tv_desc-confoundcorr_bold', component: <ConfoundcorrTv /> },
                    { key: '27', label: 'task-tv_desc-coreg_bold', component: <CoregTv /> },
                  ],
                },
              ];

              const onClick = (e) => {
                setCurrent(e.key);
                const selectedItem = items.flatMap(item => item.children).find(item => item.key === e.key);
                if (selectedItem && selectedItem.component) {
                  setSelectedComponent(selectedItem.component);
                }
                
                // check if "About" link is clicked
                if (e.key === 'sub2') { 
                  setShowAboutDescription(true);
                } else {
                  setShowAboutDescription(false);
                }
              };
              

  return (
    <Router>
    <div className="app">
      <Header />
      <div className="container">
        <Menu
          className="custom-menu"
          onClick={onClick}
          style={{
            width: 256,
            position: 'absolute',
            left: 0,
            top: '0px',
          }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        />
        {showAboutDescription && (
          <div className="about-description">
            <p>sample description. - testing</p>
          </div>
        )}
        {selectedComponent}
      </div>
    </div>

    <Routes>
    <Route path="/welcome" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </Router>

  );
};

export default App;

