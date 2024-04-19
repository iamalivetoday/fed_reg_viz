import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const ContentSection = styled.section`
  color: white;
  background: #13151C;
`;

const DocketsPage = () => {
  const { agencyAcronym } = useParams();
  const [dockets, setDockets] = useState([]);

  useEffect(() => {
    const fetchDockets = async () => {
      try {
        console.log("fetching dockets from DocketsPage")
        const response = await fetch(`http://127.0.0.1:5000/api/dockets/agency/${agencyAcronym}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const api_data = await response.json();
        setDockets(api_data.data);
      } catch (error) {
        console.error('Error fetching dockets:', error);
      }
    };

    fetchDockets();
  }, [agencyAcronym]);

  return (
    <ContentSection>
    <div>
      <h1>Dockets Page Content for {agencyAcronym}</h1>
      <ul>
        {dockets.map((d) => (
          <li key={d.id}>
            <h3>{d.attributes.title}</h3>
            <p>Docket Type: {d.attributes.docketType}</p>
            <p>Last Modified: {d.attributes.lastModifiedDate}</p>
            <a href={d.links.self} target="_blank" rel="noopener noreferrer">View Docket</a>
          </li>
        ))}
      </ul>
    </div>
    </ContentSection>
  );
};

export default DocketsPage;
