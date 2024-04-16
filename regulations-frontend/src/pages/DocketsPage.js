import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DocketsPage = () => {
  const { agencyAcronym } = useParams();
  const [dockets, setDockets] = useState([]);

  useEffect(() => {
    const fetchDockets = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/dockets/agency/${agencyAcronym}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setDockets(data);
      } catch (error) {
        console.error('Error fetching dockets:', error);
      }
    };

    fetchDockets();
  }, [agencyAcronym]);

  return (
    <div>
      Dockets Page Content for {agencyAcronym}
      <ul>
        {dockets.map((docket) => (
          <li key={docket.docketId}>{docket.docketId}</li>
        ))}
      </ul>
    </div>
  );
};

export default DocketsPage;
