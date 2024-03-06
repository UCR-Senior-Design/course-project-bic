import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataPathForm from "./pages/InputData";
import Home from "./pages/Home";
import Layout from "./Layout"; // Import the layout component here
import Subjects from './pages/Subjects';
import Figures from './pages/Figures';
import SubjectView from './pages/PlotSubjectView';
import TypeView from './pages/PlotType';
import ThresholdSpike from './pages/ThresholdSpike';
import PlotFilter from "./pages/PlotFilter";
import FilterPlots from "./pages/FilterPlots";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<DataPathForm />} />
        <Route path='/inputdata' element={<DataPathForm />} />
        <Route path='/home' element={<Layout><Home /></Layout>} />
        <Route path='/thres-spike' element={<ThresholdSpike />} />
        <Route path='/subjects/:subjectFolder' element={<Layout><Subjects /></Layout>} />
        <Route path='/Figures/:task/:taskName' element={<Layout><Figures /></Layout>} />
        <Route path='/plots/subjects/:subjectFolder' element={<Layout><SubjectView /></Layout>} />
        <Route path='/plots/type/:plotType' element={<Layout><TypeView /></Layout>} />
        <Route path='/plotfilter' element={<PlotFilter />} />
        <Route path='/filterplots' element={<FilterPlots />} />
      </Routes>
    </Router>
  );
}

export default App;