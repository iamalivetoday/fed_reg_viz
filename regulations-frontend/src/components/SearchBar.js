import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 300px;
`;

const SearchInput = styled.input`
  padding: 10px 10px 10px 40px; /* Adjust padding to leave space for the icon */
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
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
      <SearchIcon src="/../assets/search.png" alt="Search" />
      <SearchInput
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
      />
    </SearchContainer>
  );
};

export default SearchBar;
