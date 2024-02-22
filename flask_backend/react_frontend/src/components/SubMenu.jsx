import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as RiIcons from 'react-icons/ri'; 

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

const SubMenu = ({ title, items, type }) => {
  const [subnav, setSubnav] = useState(false);
  const [subnavOpen, setSubnavOpen] = useState({});

  const showSubnav = () => setSubnav(!subnav);

  const toggleSubnav = (task) => {
    setSubnavOpen(prevState => ({
      ...prevState,
      [task]: !prevState[task]
    }));
  };

  return (
    <>
      <SidebarLink to="#" onClick={showSubnav}>
        <div>
          <SidebarLabel>{title}</SidebarLabel>
        </div>
        <div>
          {subnav ? <RiIcons.RiArrowUpSFill /> : <RiIcons.RiArrowDownSFill />} {/* Use provided icons */}
        </div>
      </SidebarLink>
      {subnav && type === 'Figures' && (
        Object.keys(items).map((task, index) => {
          return (
            <div key={index}>
              <SidebarLink to="#" onClick={() => toggleSubnav(task)}>
                <div>
                  <SidebarLabel>{task}</SidebarLabel>
                </div>
                <div>
                  {subnavOpen[task] ? <RiIcons.RiArrowUpSFill /> : <RiIcons.RiArrowDownSFill />} {/* Use provided icons */}
                </div>
              </SidebarLink>
              {subnavOpen[task] && items[task].map((name, idx) => (
                <SidebarLink to={`/${type}/${task}/${name}`} key={idx}>
                  <SidebarLabel>{name}</SidebarLabel>
                </SidebarLink>
              ))}
            </div>
          );
        })
      )}
      {subnav && type !== 'Figures' && (
        items.map((item, index) => {
          return (
            <SidebarLink to={`/${type}/${item}`} key={index}>
              <SidebarLabel>{item}</SidebarLabel>
            </SidebarLink>
          );
        })
      )}
    </>
  );
};

export default SubMenu;
