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
  const [isLoading, setIsLoading] = useState(true);  // Add isLoading state

  useEffect(() => {
    setIsLoading(true);  // Set loading to true when fetching starts
    axios.get(`http://127.0.0.1:5000/api/comments_with_sentiment/${docketId}`)
      .then(response => {
        const fetchedComments = response.data.map(comment => ({
          id: comment.id,
          color: comment.color, 
          commenter: { firstName: comment.name.split(' ')[0], lastName: comment.name.split(' ')[1] },
          text: comment.text,
        }));

        fetchedComments.forEach(comment => {
          console.log(`Comment ID: ${comment.id}, Color: ${comment.color}`);
        });
        
        setComments(fetchedComments);
        setIsLoading(false);  // Set loading to false when comments are fetched
      })
      .catch(error => {
        console.error('Failed to fetch comments:', error);
        setIsLoading(false);  // Set loading to false even if there's an error
      });
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
      <AllComments 
        comments={comments} 
        setActiveComment={handleCommentClick} 
        activeComment={activeComment} 
        isLoading={isLoading}  // Pass isLoading to AllComments
      />
      {isCommentDisplayOpen && 
        <CommentDisplay 
          comment={activeComment} 
          isLoading={isLoading} 
          onHide={hideCommentDisplay} 
        />
      }
    </div>
  );
};

export default OneDocketPage;
