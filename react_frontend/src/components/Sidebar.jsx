import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SubMenu from './SubMenu';
import Header from './Header';

const SidebarNav = styled.nav`
  background: rgb(33, 52, 99);
  width: 250px;
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  position: fixed;
  top: 60px;
  left: ${({ $sidebar }) => ($sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
  overflow-y: auto;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [subjects, setSubjects] = useState([]);
  const [figures, setFigures] = useState({});
  const [error, setError] = useState(null); 

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/subjects')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch subjects');
        }
        return response.json();
      })
      .then(data => setSubjects(data.subjects))
      .catch(error => setError(error.message)); // Set error message if fetch fails

    fetch('http://127.0.0.1:5000/api/figures')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch figures');
        }
        return response.json();
      })
      .then(data => setFigures(groupFigures(data.figures)))
      .catch(error => setError(error.message)); // Set error message if fetch fails
  }, []);

  // Function to group figures by task
  const groupFigures = (figures) => {
    return figures.reduce((acc, figure) => {
      const task = figure.task || 'none'; // Set task to 'none' if not available
      if (!acc[task]) {
        acc[task] = [];
      }
      acc[task].push(figure.name);
      return acc;
    }, {});
  };

return (
    <>
      <Header />
      <SidebarNav $sidebar="true">
        <SidebarWrap>
          {error && <div>Error: {error}</div>}
          {/* Render SubMenu for Subjects */}
          <SubMenu title="Subjects" items={subjects} type="Subjects" />
          {/* Render SubMenu for Figures */}
          <SubMenu title="Figures" items={figures} type="Figures" />
          <SubMenu title="Plots" items={subjects} type="Plots" />
        </SidebarWrap>
      </SidebarNav>
    </>
  );
};

export default Sidebar;