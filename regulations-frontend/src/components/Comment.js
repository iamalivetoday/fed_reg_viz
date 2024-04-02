import React from 'react';
import styled from 'styled-components';

// Styled component for the Comment box
const CommentBox = styled.div`
  width: 100px;  // Equal width and height make a circle when border-radius is 50%
  height: 100px; // Adjust these dimensions as needed, but keep them equal for a circle
  background-color: ${props => props.color || 'white'};
  border: 2px solid black;
  border-radius: 40%; // 50% Makes the shape a circle
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-family: Arial, sans-serif;
`;

const Comment = ({ color, onMouseEnter, onMouseLeave }) => {
  let backgroundColor;
  switch (color) {
    case 'green':
      backgroundColor = 'lightgreen';
      break;
    case 'yellow':
      backgroundColor = 'yellow';
      break;
    case 'red':
      backgroundColor = 'lightcoral';
      break;
    default:
      backgroundColor = 'white';
  }

  return (
    <CommentBox
      color={backgroundColor}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Content goes here */}
    </CommentBox>
  );
};
export default Comment;
