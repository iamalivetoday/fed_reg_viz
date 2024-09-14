import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-between; /* Ensures space between the groups */
  padding: 1rem;
`;

const NavLink = styled(Link)`
  padding: 0.1em 0.2em;
  color: inherit;
  margin: 0 0.4em; /* Spacing between links */
  text-decoration: none;
  border-radius: 0.2em;
  transition: background-color 0.3s;

  &:nth-child(2) {
    margin-right: 100px; /* Adds extra space after the second link */
  }

  &:hover {
    background-color: inherit; /* Color for hover state */
  }
`;


const Navbar = () => {

  return (
    <>
      <NavBarContainer>
        <NavLink to="/">home</NavLink>
        <NavLink to="/about">about</NavLink>
        <NavLink to="/agencies">agencies</NavLink>
      </NavBarContainer>
    </>
  );
};

export default Navbar;
