import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Subjects from './pages/Subjects';
import Figures from './pages/Figures';
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import About from "./pages/About";



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
      </Routes>
    </Router>
  );
}

export default App;