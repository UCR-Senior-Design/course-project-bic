import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
    border-left: 4px solid #ffffff;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const SubMenu = ({ title, items = [], type }) => { // Ensure items is always defined
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink to="#" onClick={showSubnav}>
        <div>
          <SidebarLabel>{title}</SidebarLabel>
        </div>
        <div>
          {subnav ? '-' : '+'}
        </div>
      </SidebarLink>
      {subnav &&
        items.map((task, index) => {
          return (
            <div key={index}>
              <SidebarLink to="#" onClick={showSubnav}>
                <SidebarLabel>{task}</SidebarLabel>
                <div>
                  {subnav ? '-' : '+'}
                </div>
              </SidebarLink>
              {subnav &&
                items[task].map((item, index) => ( // Change items[task] to items
                  <SidebarLink to={`/${type}/${task}/${item}`} key={index}>
                    <SidebarLabel>{item}</SidebarLabel>
                  </SidebarLink>
                ))
              }
            </div>
          );
        })}
    </>
  );
};

export default SubMenu;