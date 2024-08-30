import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ContentSection = styled.section`
  color: black;
  background: white;
  padding: 20px;
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

const DocketsPage = () => {
  const { agencyAcronym } = useParams();
  const [dockets, setDockets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDockets = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/dockets/agency/${agencyAcronym}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const api_data = await response.json();
        setDockets(api_data.data);
      } catch (error) {
        console.error('Error fetching dockets:', error);
      }
      setIsLoading(false);
    };

    fetchDockets();
  }, [agencyAcronym]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const handleDocketClick = (docketId) => {
    navigate(`/onedocket/${docketId}`);
  };

  return (
    <ContentSection>
      <h1>Dockets Page Content for {agencyAcronym}</h1>
      {isLoading ? (
        <LoadingMessage>Loading dockets...</LoadingMessage>
      ) : dockets.length > 0 ? (
        <StyledTable>
          <thead>
            <tr>
              <th>Title</th>
              <th>Last Modified Date</th>
            </tr>
          </thead>
          <tbody>
            {dockets.map((docket) => (
              <tr key={docket.id}>
                <td>
                  <StyledLink onClick={() => handleDocketClick(docket.id)}>
                    {docket.attributes.title}
                  </StyledLink>
                </td>
                <td>{formatDate(docket.attributes.lastModifiedDate)}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      ) : (
        <LoadingMessage>No recent dockets.</LoadingMessage>
      )}
    </ContentSection>
  );
};

export default DocketsPage;
