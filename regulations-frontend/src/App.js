import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AllComments from './components/AllComments';
import DocketSummary from './components/DocketSummary';

const App = () => {
  const [comments, setComments] = useState([]);
  const docketId = "FTC-2024-0018"; // Example docket ID

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/comments/${docketId}`)
      .then(response => {
        const fetchedComments = response.data.map(comment => ({
          id: comment.id,
          color: 'green', // Setting all comments to green for now
          commenter: { firstName: comment.name.split(' ')[0], lastName: comment.name.split(' ')[1] },
          text: comment.text,
        }));
        setComments(fetchedComments);
      })
      .catch(error => console.error('Failed to fetch comments:', error));
  }, [docketId]); // Depend on docketId so if it changes, we refetch comments


  return (
    <div>
      <DocketSummary docketId={docketId} />
      <AllComments comments={comments} bgColor="lightblue" />
    </div>
  );
};

export default App;
