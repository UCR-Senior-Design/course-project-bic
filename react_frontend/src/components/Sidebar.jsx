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
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
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

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/subjects')
      .then(response => response.json())
      .then(data => setSubjects(data.subjects))
      .catch(error => console.error('Error fetching subjects:', error));

    fetch('http://127.0.0.1:5000/api/figures')
      .then(response => response.json())
      .then(data => setFigures(groupFigures(data.figures)))
      .catch(error => console.error('Error fetching figures:', error));
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

  // Function to group figures by task
  // const groupSubjects = (subjects) => {
  //   return subjects.reduce((acc, subject) => {
  //     const task = subject.task || 'none'; 
  //     if (!acc[task]) {
  //       acc[task] = [];
  //     }
  //     acc[task].push(subject.name);
  //     return acc;
  //   }, {});
  // };

  return (
    <>
      <Header />
      <SidebarNav sidebar={true}>
        <SidebarWrap>
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