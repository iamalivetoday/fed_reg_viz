import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/about">About</Link> | 
      <Link to="/dockets">Dockets</Link> | 
      <Link to="/onedocket">One Docket</Link>
    </nav>
  );
};

export default NavBar;
