// CommentCard.js

import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  width: 90%; // Sets the card width to 90% of its parent container
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px auto; // Centers the card within its parent
  word-wrap: break-word;
`;

const CommentCard = ({ commenter, text }) => {
  if (!commenter) return null; // Don't render the card if no commenter is provided

  return (
    <Card>
      <p>{commenter.firstName} {commenter.lastName}</p>
      <p>{text}</p>
    </Card>
  );
};

export default CommentCard;
