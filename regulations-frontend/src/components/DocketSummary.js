import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'; // Import styled-components

const SummaryContainer = styled.div`
  width: 78%;
  background-color: #f1f1f1; /* Light gray fill */
  border: 2px solid #333;
  border-radius: 15px; /* Rounded borders */
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto; /* Adjusted margin for alignment */
  word-wrap: break-word;
`;

const Subheading = styled.h2`
  font-size: 1.5em;
  color: #333;
  margin-bottom: 10px; /* Space between the subheading and the summary text */
`;

function DocketSummary({ docketId }) {
  const [summary, setSummary] = useState('');

  useEffect(() => {
    if (!docketId || docketId === '<docket_id>') {
      console.error('Invalid or missing docketId prop:', docketId);
      return;
    }

    axios.get(`http://127.0.0.1:5000/api/docket_abstract/${docketId}`)
      .then(response => {
        setSummary(response.data.abstract);
      })
      .catch(error => {
        console.error('Oh nooo!', error);
      });
  }, [docketId]);

  return (
    <SummaryContainer>
      <Subheading>{docketId} Summary</Subheading>
      <p>{summary ? summary : 'Loading docket summary...'}</p>
    </SummaryContainer>
  );
}

export default DocketSummary;
