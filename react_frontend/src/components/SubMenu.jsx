import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import { CiImageOn } from 'react-icons/ci';
import { IoPersonOutline } from 'react-icons/io5';
import { VscGraph } from 'react-icons/vsc'; // Import VscGraph icon

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const SubMenu = ({ title, items, type, icon }) => {
  const [subnav, setSubnav] = useState(false);
  const [subnavOpen, setSubnavOpen] = useState({});

  const showSubnav = () => setSubnav(!subnav);

  const toggleSubnav = (task) => {
    setSubnavOpen((prevState) => ({
      ...prevState,
      [task]: !prevState[task],
    }));
  };

  // Determine which icon to display based on the type
  const determineIcon = () => {
    switch (type) {
      case 'Subjects':
        return <IoPersonOutline />;
      case 'Figures':
        return <CiImageOn />;
      case 'Plots':
        return <VscGraph />;
      default:
        return null;
    }
  };

  return (
    <>
      <SidebarLink to="#" onClick={showSubnav}>
        <div>
          {determineIcon()}
          <SidebarLabel>{title}</SidebarLabel>
        </div>
        <div>{subnav ? <RiArrowUpSFill /> : <RiArrowDownSFill />}</div>
      </SidebarLink>
      {subnav &&
        type === 'Figures' &&
        Object.keys(items).map((task, index) => {
          return (
            <div key={index}>
              <SidebarLink to="#" onClick={() => toggleSubnav(task)}>
                <div>
                  <SidebarLabel>{task}</SidebarLabel>
                </div>
                <div>
                  {subnavOpen[task] ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
                </div>
              </SidebarLink>
              {subnavOpen[task] &&
                items[task].map((name, idx) => (
                  <SidebarLink
                  to={`/${type}/${task}/${task.includes('task') ? `${task}_${name}` : name}`}
                    key={idx}
                  >
                    <SidebarLabel>{name}</SidebarLabel>
                  </SidebarLink>
                ))}
            </div>
          );
        })}
      {subnav && type === 'Subjects' && (
        items.map((subject, index) => { // For Subjects, map over subject items
          return (
            <SidebarLink to={`/subjects/${subject}`} key={index}> {/* Link to Subjects page with subject parameter */}
              <SidebarLabel>{subject}</SidebarLabel>
            </SidebarLink>
          );
        })
      )}
      {subnav && type === 'Plots' && (
        <div>
          {/* Submenu for Subject View */}
          <SidebarLink to="#" onClick={() => toggleSubnav("SubjectView")}>
            <div>
              <SidebarLabel>Subject View</SidebarLabel>
            </div>
            <div>
              {subnavOpen["SubjectView"] ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
            </div>
          </SidebarLink>
          {subnavOpen["SubjectView"] &&
            items.map((subject, idx) => (
              <SidebarLink to={`/plots/subjects/${subject}`} key={idx}>
                <SidebarLabel>{subject}</SidebarLabel>
              </SidebarLink>
            ))}
          {/* Submenu for Plot Type View */}
          <SidebarLink to="#" onClick={() => toggleSubnav("PlotTypeView")}>
            <div>
              <SidebarLabel>Plot Type View</SidebarLabel>
            </div>
            <div>
              {subnavOpen["PlotTypeView"] ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
            </div>
          </SidebarLink>
          {subnavOpen["PlotTypeView"] && (
            <>
              <SidebarLink to="/plots/type/Rotation">
                <SidebarLabel>Rotation</SidebarLabel>
              </SidebarLink>
              <SidebarLink to="/plots/type/Translation">
                <SidebarLabel>Translation</SidebarLabel>
              </SidebarLink>
              <SidebarLink to="/plots/type/Displacement">
                <SidebarLabel>Displacement</SidebarLabel>
              </SidebarLink>
            </>
          )} 
        </div>
      )}
    </>
  );
};

export default SubMenu;