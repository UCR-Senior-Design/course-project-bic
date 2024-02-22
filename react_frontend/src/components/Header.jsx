import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '/home/blore005/course-project-bic/react_frontend/src/logo1.jpg';
import './Header.css'; // Import CSS file for styling

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src={logoImg} className="logo-img" alt="Logo" />
      </div>
      <h1 className="title">fMRI Data Outputs</h1>
      <div className="navigation">
        <input type="text" placeholder="Search..." className="search-bar" />
        <Link to="/welcome" className="welcome-link">Welcome</Link>
        <Link to="/home" className="home-link">Home</Link>
        <Link to="/about" className="about-link">About</Link>
      </div>
    </div>
  );
};

export default Header;
