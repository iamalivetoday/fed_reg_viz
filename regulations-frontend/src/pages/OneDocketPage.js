import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AllComments from '../components/AllComments';
import DocketSummary from '../components/DocketSummary';
import CommentDisplay from '../components/CommentDisplay'; 
import AgencyButton from '../components/AgencyButton'; // Ensure you import AgencyButton

const OneDocketPage = () => {
  const [comments, setComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const [isCommentDisplayOpen, setIsCommentDisplayOpen] = useState(false);
  const [docketId, setDocketId] = useState("FTC-2024-0018"); // Make docketId a state to dynamically change it

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/comments/${docketId}`)
      .then(response => {
        const fetchedComments = response.data.map(comment => ({
          id: comment.id,
          color: comment.color, // Setting all comments to green for now
          commenter: { firstName: comment.name.split(' ')[0], lastName: comment.name.split(' ')[1] },
          text: comment.text,
        }));
        setComments(fetchedComments);
      })
      .catch(error => console.error('Failed to fetch comments:', error));
  }, [docketId]); // Depend on docketId so if it changes, we refetch comments

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the comment display if there's a click outside
      if (isCommentDisplayOpen && !event.target.closest("#commentDisplayCard")) {
        setActiveComment(null);
        setIsCommentDisplayOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Cleanup the listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCommentDisplayOpen]); // Only re-run if isCommentDisplayOpen changes

  const handleCommentClick = (comment) => {
    setActiveComment(prevComment =>
      prevComment && prevComment.id === comment.id ? null : comment
    );
    setIsCommentDisplayOpen(!!comment);
  };

  const hideCommentDisplay = () => {
    setActiveComment(null);
    setIsCommentDisplayOpen(false);
  };

  const fetchDocketsByAgency = (agencyAcronym) => {
    // Example function to fetch dockets by agency and set the first docket's ID
    axios.get(`http://127.0.0.1:5000/api/dockets/agency/${agencyAcronym}`)
      .then(response => {
        // Assume response contains an array of dockets; set the first one as current
        if (response.data && response.data.length > 0) {
          setDocketId(response.data[0].id);
          console.log(`Dockets for ${agencyAcronym}:`, response.data);
        }
      })
      .catch(error => console.error('Failed to fetch dockets:', error));
  };

  return (
    <div>
      {/* Render Agency Buttons */}
      <AgencyButton agencyId="EPA" onClick={fetchDocketsByAgency} />
      <AgencyButton agencyId="FTC" onClick={fetchDocketsByAgency} />
      <AgencyButton agencyId="CPSC" onClick={fetchDocketsByAgency} />
      {/* Existing Components */}
      <DocketSummary docketId={docketId} />
      <AllComments comments={comments} setActiveComment={handleCommentClick} activeComment={activeComment} bgColor="lightblue" />
      {isCommentDisplayOpen && <CommentDisplay comment={activeComment} onHide={hideCommentDisplay} />}
    </div>
  );
};

export default OneDocketPage;
