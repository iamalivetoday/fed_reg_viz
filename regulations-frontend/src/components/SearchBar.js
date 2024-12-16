import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ManateeImage from '../assets/search.png';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  padding: 10px 10px 10px 40px; /* Adjust padding to leave space for the icon */
  border: 1px solid #ccc;
  color: #a9a9a9;
  border-radius: 25px; /* Match the buttons */
  width: 100%;
  transition: all 0.3s ease; /* Smooth hover transition */
  font-size: 16px; /* Improve text readability */

  &:hover {
    border-color: #0A3161; /* Slightly change border color */
  }hat

  &:focus {
    outline: none;
    border-color: #0A3161;
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  left: 10px;
  width: 20px;
  height: 20px;
  pointer-events: none; /* Ensure the icon doesn’t interfere with input focus */
`;

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <SearchContainer>
      <SearchIcon src={ManateeImage} alt="Search" />
      <SearchInput
        type="text"
        placeholder="search ..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
      />
    </SearchContainer>
  );
};

export default SearchBar;
