import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';

const ContentSection = styled.section`
  color: black;
  background: white;
  padding-left: 20px;
  padding-right: 20px;
  height: 88vh;
`;

const HeaderSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td {
    border: 1px solid;
    padding: 10px;
    text-align: left;
  }
`;

const StyledLink = styled.span`
  cursor: pointer;
  text-decoration: none;
  &:hover {
    font-style: italic;
  }
`;

const LoadingMessage = styled.div`
  margin-top: 20px;
`;


const SearchPage = () => {
  const { term } = useParams(); // Retrieve the term from the URL
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/search/${term}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const api_data = await response.json();
        setSearchResults(api_data.data || []);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
      setIsLoading(false);
    };

    if (term) fetchSearchResults();
  }, [term]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const handleDocumentClick = (documentId) => {
    navigate(`/onedocument/${documentId}`);
  };

  return (
    <ContentSection>
      <HeaderSection>
        <h1 style={{marginBottom:'10px'}}>search for: {term}</h1>
        <SearchBar/>
      </HeaderSection>

      {isLoading ? (
        <LoadingMessage>Loading search results...</LoadingMessage>
      ) : searchResults.length > 0 ? (
        <StyledTable>
          <thead>
            <tr>
              <th>Title</th>
              <th>Last Modified Date</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((document) => (
              <tr key={document.id}>
                <td>
                  <StyledLink onClick={() => handleDocumentClick(document.id)}>
                    {document.attributes.title}
                  </StyledLink>
                </td>
                <td>{formatDate(document.attributes.lastModifiedDate)}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      ) : (
        <LoadingMessage>No results found for the search term.</LoadingMessage>
      )}
    </ContentSection>
  );
};

export default SearchPage;
