import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Subjects from './pages/Subjects';
import Figures from './pages/Figures';
import SubjectView from './pages/PlotSubjectView';
import TypeView from './pages/PlotType';
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import About from "./pages/About";
import PlotFilter from "./pages/PlotFilter";
function App() {
  return (
    <Router>
      <Header />
      <Sidebar />
      <Routes>
        <Route path='/welcome' element={<Welcome />} /> 
        <Route path='/home' element={<Home />} /> 
        <Route path='/about' element={<About />} /> 
        <Route path='/subjects/:subjectFolder' element={<Subjects />} /> 
        <Route path='/Figures/:task/:taskName' element={<Figures />} />
        <Route path='/plots/subjects/:subjectFolder' element={<SubjectView />} />
        <Route path='/plots/type/:plotType' element={<TypeView />} />
        <Route path='/plotfilter' element={<PlotFilter />} />
      </Routes>
    </Router>
  );
}

export default App;