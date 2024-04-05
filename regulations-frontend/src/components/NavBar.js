import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-between; /* Ensures space between the groups */
  padding: 1rem;
  background: #13151C; /* Dark background color */
  color: white;
`;

const NavLink = styled(Link)`
  padding: 10px 30px;
  margin: 0; /* Spacing between links */
  text-decoration: none;
  color: white;
  border-radius: 20px;
  transition: background-color 0.3s;

  &:nth-child(2) {
    margin-right: 100px; /* Adds extra space after the second link */
  }

  &:hover {
    background-color: #6259ca; /* Color for hover state */
  }
`;

const Navbar = () => {
  return (
    <NavBarContainer>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/dockets">Agencies</NavLink>
      <NavLink to="/dockets">Dockets</NavLink>
    </NavBarContainer>
  );
};

//      <NavLink to="/onedocket">One Docket</NavLink>

export default Navbar;
