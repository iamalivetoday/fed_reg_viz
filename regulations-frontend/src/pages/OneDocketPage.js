import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AllComments from '../components/AllComments';
import DocketSummary from '../components/DocketSummary';
import CommentDisplay from '../components/CommentDisplay';

const OneDocketPage = () => {
  const { docketId } = useParams();  // Use useParams to get the docketId from the URL
  const [comments, setComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const [isCommentDisplayOpen, setIsCommentDisplayOpen] = useState(false);

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
      .catch(error => console.error('unfortunately to fetch comments:', error));
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

  return (
    <div>
      <DocketSummary docketId={docketId} />
      <AllComments comments={comments} setActiveComment={handleCommentClick} activeComment={activeComment} bgColor="#f1f1f1" />
      {isCommentDisplayOpen && <CommentDisplay comment={activeComment} onHide={hideCommentDisplay} />}
    </div>
  );
};

export default OneDocketPage;
