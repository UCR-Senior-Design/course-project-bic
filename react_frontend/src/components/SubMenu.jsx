// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import * as RiIcons from 'react-icons/ri'; 

// const SidebarLink = styled(Link)`
//   display: flex;
//   color: #e1e9fc;
//   justify-content: space-between;
//   align-items: center;
//   padding: 20px;
//   list-style: none;
//   height: 60px;
//   text-decoration: none;
//   font-size: 18px;

//   &:hover {
//     background: #252831;
//     border-left: 4px solid #632ce4;
//     cursor: pointer;
//   }
// `;

// const SidebarLabel = styled.span`
//   margin-left: 16px;
// `;

// const SubMenu = ({ title, items, type }) => {
//   const [subnav, setSubnav] = useState(false);
//   const [subnavOpen, setSubnavOpen] = useState({});

//   const showSubnav = () => setSubnav(!subnav);

//   const toggleSubnav = (task) => {
//     setSubnavOpen(prevState => ({
//       ...prevState,
//       [task]: !prevState[task]
//     }));
//   };

//   return (
//     <>
//       <SidebarLink to="#" onClick={showSubnav}>
//         <div>
//           <SidebarLabel>{title}</SidebarLabel>
//         </div>
//         <div>
//           {subnav ? <RiIcons.RiArrowUpSFill /> : <RiIcons.RiArrowDownSFill />} {/* Use provided icons */}
//         </div>
//       </SidebarLink>
//       {subnav && type === 'Figures' && (
//         Object.keys(items).map((task, index) => {
//           return (
//             <div key={index}>
//               <SidebarLink to="#" onClick={() => toggleSubnav(task)}>
//                 <div>
//                   <SidebarLabel>{task}</SidebarLabel>
//                 </div>
//                 <div>
//                   {subnavOpen[task] ? <RiIcons.RiArrowUpSFill /> : <RiIcons.RiArrowDownSFill />} {/* Use provided icons */}
//                 </div>
//               </SidebarLink>
//               {subnavOpen[task] && items[task].map((name, idx) => (
//                 <SidebarLink to={`/${type}/${task}/${name}`} key={idx}>
//                   <SidebarLabel>{name}</SidebarLabel>
//                 </SidebarLink>
//               ))}
//             </div>
//           );
//         })
//       )}
//       {subnav && type !== 'Figures' && (
//         items.map((item, index) => {
//           return (
//             <SidebarLink to={`/${type}/${item}`} key={index}>
//               <SidebarLabel>{item}</SidebarLabel>
//             </SidebarLink>
//           );
//         })
//       )}
//     </>
//   );
// };

// export default SubMenu;

// SubMenu.jsx

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri'; // Import the RiIcons library
// import { CiImageOn } from 'react-icons/ci'; // Import the CiIcons library
// import { IoPersonOutline } from 'react-icons/io5'; // Import the Io5Icons library

// const SidebarLink = styled(Link)`
//   display: flex;
//   color: #e1e9fc;
//   justify-content: space-between;
//   align-items: center;
//   padding: 20px;
//   list-style: none;
//   height: 60px;
//   text-decoration: none;
//   font-size: 18px;

//   &:hover {
//     background: #252831;
//     border-left: 4px solid #632ce4;
//     cursor: pointer;
//   }
// `;

// const SidebarLabel = styled.span`
//   margin-left: 16px;
// `;

// const SubMenu = ({ title, items, type, icon }) => {
//   const [subnav, setSubnav] = useState(false);
//   const [subnavOpen, setSubnavOpen] = useState({});

//   const showSubnav = () => setSubnav(!subnav);

//   const toggleSubnav = (task) => {
//     setSubnavOpen(prevState => ({
//       ...prevState,
//       [task]: !prevState[task]
//     }));
//   };

//   return (
//     <>
//       <SidebarLink to="#" onClick={showSubnav}>
//         <div>
//           {icon} {/* Display icon */}
//           <SidebarLabel>{title}</SidebarLabel>
//         </div>
//         <div>
//           {subnav ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
//         </div>
//       </SidebarLink>
//       {subnav && type === 'Figures' && (
//         Object.keys(items).map((task, index) => {
//           return (
//             <div key={index}>
//               <SidebarLink to="#" onClick={() => toggleSubnav(task)}>
//                 <div>
//                   <SidebarLabel>{task}</SidebarLabel>
//                 </div>
//                 <div>
//                   {subnavOpen[task] ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
//                 </div>
//               </SidebarLink>
//               {subnavOpen[task] && items[task].map((name, idx) => (
//                 <SidebarLink to={`/${type}/${task}/${name}`} key={idx}>
//                   <SidebarLabel>{name}</SidebarLabel>
//                 </SidebarLink>
//               ))}
//             </div>
//           );
//         })
//       )}
//       {subnav && type === 'Subjects' && (
//         items.map((subject, index) => { // For Subjects, map over subject items
//           return (
//             <SidebarLink to={`/subjects/${subject}`} key={index}> {/* Link to Subjects page with subject parameter */}
//               <SidebarLabel>{subject}</SidebarLabel>
//             </SidebarLink>
//           );
//         })
//       )}
//     </>
//   );
// };

// export default SubMenu;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import { CiImageOn } from 'react-icons/ci';
import { IoPersonOutline } from 'react-icons/io5';

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

  return (
    <>
      <SidebarLink to="#" onClick={showSubnav}>
        <div>
          {icon} {/* Display icon */}
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
    </>
  );
};

export default SubMenu;
