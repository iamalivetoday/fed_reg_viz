import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const SummaryContainer = styled.div`
  width: 90%;
  border: 1px solid #333;
  padding: 10px;
  margin: 20px auto;
  word-wrap: break-word;
`;

const Subheading = styled.h2`
  font-size: 1.5em;
  color: #333;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-size: 1em;
  color: #555;
  margin-bottom: 5px;
`;

const SmallText = styled.p`
  font-size: 0.8em;
  color: #777;
`;

function DocketSummary({ docketId }) {
  const [summary, setSummary] = useState('');
  const [docket, setDocket] = useState(null);

  useEffect(() => {
    if (!docketId || docketId === '<docket_id>') {
      console.error('Invalid or missing docketId prop:', docketId);
      return;
    }

    axios.get(`http://127.0.0.1:5000/api/docket_abstract/${docketId}`)
      .then(response => {
        const abstract = response.data.abstract;
        const cleanedAbstract = abstract.replace(
          'To see the Request for Information and submit a comment, please click on “Browse Documents.”', 
          ''
        );
        setSummary(cleanedAbstract.trim());
      })
      .catch(err => { // changed 'error' to 'err'
        console.error('Oh nooo!', err);
      });
  }, [docketId]);

  useEffect(() => {
    if (!docketId || docketId === '<docket_id>') {
      console.error('Invalid or missing docketId prop:', docketId);
      return;
    }

    const fetchDocketTitle = async () => {
      try {
        const response = await fetch(`/api/title/${docketId}`);
        const data = await response.json();

        if (response.ok) {
          setDocket(data);
        } 
      } catch (err) { // changed 'error' to 'err'
        console.error('Oh nooo!', err);
      }
    };

    fetchDocketTitle();
  }, [docketId]);

  return (
    <SummaryContainer>
      <Subheading>{docket?.shortTitle || 'No Short Title'}</Subheading>
      <Text>{docket?.title || 'No Title'}</Text>
      <SmallText>Docket ID: {docketId}</SmallText>
      <p>{summary === null ? 'No abstract found' : summary || 'Loading docket summary...'}</p>
    </SummaryContainer>
  );
}

export default DocketSummary;
