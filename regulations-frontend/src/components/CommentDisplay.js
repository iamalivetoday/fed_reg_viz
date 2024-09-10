import React from 'react';
import styled from 'styled-components';

const CommentCard = styled.div`
  width: 80%;
  background-color: #f1f1f1;
  border: 2px solid #333;
  padding: 10px 20px;
  max-height: 200px; /* Adjust as needed */
  overflow-y: auto; /* Adds scroll */
  margin: 20px auto;
  border-radius: 30px; // 50% Makes the shape a circle
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: fixed; /* Fixed position to prevent layout shift */
  bottom: 10px; /* Positioned at the bottom of the screen */
  left: 5%; /* Centered horizontally */
  right: 5%;
`;

const CommentHeader = styled.div`
  display: flex; // Use flexbox to align items in a row
  justify-content: space-between; // Puts space between the name and the button
  align-items: center; // Vertically center items
`;

const HideButton = styled.button`
  // Style your button as desired
  padding: 5px 10px;
  margin-left: 10px 0;
  border: 2px solid #333;
  background: #f9f9f9;
  border-radius: 30px; // 50% Makes the shape a circle
  cursor: pointer;
`;

const CommentDisplay = ({ comment, onHide }) => {
  if (!comment) {
    return null; // or some placeholder
  }

  return (
    <CommentCard>
      <CommentHeader>
        <h3>{comment.commenter.firstName} {comment.commenter.lastName}</h3>
        <HideButton onClick={onHide}>Hide</HideButton>
      </CommentHeader>
      <p>{comment.text}</p>
    </CommentCard>
  );
};





export default CommentDisplay;
