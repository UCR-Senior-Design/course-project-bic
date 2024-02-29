// import './App.css';
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Subjects from './pages/Subjects';
// import Figures from './pages/Figures';
// import SubjectView from './pages/PlotSubjectView';
// import TypeView from './pages/PlotType';
// import Welcome from "./pages/Welcome";
// import Home from "./pages/Home";
// import About from "./pages/About";

// function App() {
//   return (
//     <Router>
//       <Header />
//       {/* <Sidebar /> */}
//       <Routes>
//         <Route path='/' element={<Welcome />} /> 
//         <Route path='/welcome' element={<Welcome />} /> 
//         <Route path='/home' element={<Home />} /> 
//         <Route path='/about' element={<About />} /> 
//         <Route path='/subjects/:subjectFolder' element={<Subjects />} /> 
//         <Route path='/Figures/:task/:taskName' element={<Figures />} />
//         <Route path='/plots/subjects/:subjectFolder' element={<SubjectView />} />
//         <Route path='/plots/type/:plotType' element={<TypeView />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./Layout"; // Import the layout component here
import Subjects from './pages/Subjects';
import Figures from './pages/Figures';
import SubjectView from './pages/PlotSubjectView';
import TypeView from './pages/PlotType';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/home' element={<Layout><Home /></Layout>} />
        <Route path='/about' element={<About />} />
        <Route path='/subjects/:subjectFolder' element={<Layout><Subjects /></Layout>} />
        <Route path='/Figures/:task/:taskName' element={<Layout><Figures /></Layout>} />
        <Route path='/plots/subjects/:subjectFolder' element={<Layout><SubjectView /></Layout>} />
        <Route path='/plots/type/:plotType' element={<Layout><TypeView /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
