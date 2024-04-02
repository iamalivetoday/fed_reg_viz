import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios

function DocketSummary({ docketId }) {
  const [summary, setSummary] = useState('');

  useEffect(() => {
    console.log('Hi, docketId:', docketId);

    if (!docketId || docketId === '<docket_id>') {
      console.error('Invalid or missing docketId prop:', docketId);
      return;
    }

    axios.get(`http://127.0.0.1:5000/api/docket_abstract/${docketId}`)
      .then(response => {
        setSummary(response.data.abstract); // Accessing data with Axios
      })
      .catch(error => {
        console.error('Oh nooo!', error);
      });
  }, [docketId]);

  return (
    <div>
      <p style={{ color: 'black', fontFamily: 'sans-serif' }}>{summary ? summary : 'Hi Mado...'}</p>
    </div>
  );
}

export default DocketSummary;
