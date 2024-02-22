import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Subjects from './pages/Subjects';
import Figures from './pages/Figures';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Sidebar />
      <Routes>
        <Route path='/subjects/:subjectFolder' element={<Subjects />} /> 
        <Route path='/figures/:taskName' element={<Figures />} />
      </Routes>
    </Router>
  );
}

export default App;