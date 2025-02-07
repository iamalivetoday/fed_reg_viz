import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const SummaryContainer = styled.div`
  width: 93%;
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
  const [docketTitle, setDocketTitle] = useState('');
  const [docketAgency, setDocketAgency] = useState('');

  useEffect(() => {
    if (!docketId || docketId === '<docket_id>') {
      console.error('Invalid or missing docketId prop:', docketId);
      return;
    }

    axios.get(`http://127.0.0.1:5000/api/docket_abstract/${docketId}`)
      .then(response => {
        const abstract = response.data.abstract || '';
        const cleanedAbstract = abstract.replace(
          'To see the Request for Information and submit a comment, please click on “Browse Documents.”', 
          ''
        );
        setSummary(cleanedAbstract.trim());
      })
      .catch(err => {
        console.error('Oh nooo fetching abstract!', err);
      });
  }, [docketId]);

  useEffect(() => {
    if (!docketId || docketId === '<docket_id>') {
      console.error('Invalid or missing docketId prop:', docketId);
      return;
    }

    const fetchDocketTitle = async () => {
      try {
        console.log(`Fetching title for docketId: ${docketId}`); // ✅ Debugging
        const response = await axios.get(`http://127.0.0.1:5000/api/title/${docketId}`);
        console.log('API Response:', response.data); // ✅ Debugging response
        setDocketTitle(response.data.title || 'Title not found');
        setDocketAgency(response.data.agency || 'Agency not found');
      } catch (err) {
        console.error('Oh nooo fetching title!', err.response?.data?.error || err.message);
      }
    };

    fetchDocketTitle();
  }, [docketId]);

  return (
    <SummaryContainer>
      <Subheading>{docketTitle || 'Loading title...'}</Subheading>
      <Text>{docketAgency || 'Loading agency...'}</Text>
      <SmallText>Docket ID: {docketId}</SmallText>
      <p>{summary === null ? 'No abstract found' : summary || 'Loading docket summary...'}</p>
    </SummaryContainer>
  );
}

export default DocketSummary;
