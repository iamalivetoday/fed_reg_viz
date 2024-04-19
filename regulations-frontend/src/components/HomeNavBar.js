// NavigationBar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavBarContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  padding: 10px;
  margin-top: 40px;
`;

const NavButton = styled.button`
  padding: 20px 40px;
  border: none;
  border-radius: 20px;
  background-color: lightgray;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 0 8px 2px gold;
  }
  &.active {
    background-color: darkgray;
  }
`;

const HomeNavBar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <NavBarContainer>
      <NavButton onClick={() => handleNavigation('/agencies')}>Agencies</NavButton>
      <NavButton onClick={() => handleNavigation('/dockets')}>Recent</NavButton>
      <NavButton onClick={() => handleNavigation('/hot')}>Hot</NavButton>
    </NavBarContainer>
  );
};

export default HomeNavBar;
