// AllComments.js
import React, { useState } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import CommentCard from './CommentCard';

const Container = styled.div`
  width: 80%;
  min-height: 300px; // Adjust this value based on your needs
  margin: 20px auto;
  background-color: ${props => props.bgColor || '#f0f0f0'};
  border: 2px solid #333;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box; // Ensures padding does not add to the width
`;

const CommentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); // Adjust minmax's first parameter based on your minimum comment size
  gap: 10px; // Minimal gap for slight spacing
  width: 100%;
  padding: 10px; // Padding around the grid inside the container
`;

const AllComments = ({ comments, bgColor }) => {
  const [activeComment, setActiveComment] = useState(null);

  return (
    <Container bgColor={bgColor}>
      <CommentsGrid>
        {comments.map(comment => (
          <Comment
            key={comment.id}
            color={comment.color}
            onMouseEnter={() => setActiveComment(comment)}
            onMouseLeave={() => setActiveComment(null)}
          />
        ))}
      </CommentsGrid>
      <br/>
      {activeComment && (
        <CommentCard commenter={activeComment.commenter} text={activeComment.text} />
      )}
    </Container>
  );
};

export default AllComments;
