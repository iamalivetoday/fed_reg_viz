// NavigationBar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavBarContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 10px;
  margin-top: 40px; // Spacing above the text and arrow
`;

const NavButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background-color: lightgray;
  cursor: pointer;
  &:hover {
    background-color: gray; // Color change on hover
  }
  &.active {
    background-color: darkgray; // Color for the active state
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
