import React from 'react';
import styled from 'styled-components';
import Comment from './Comment';

const Container = styled.div`
  width: 93%;
  border: 1px solid #333;
  padding: 10px;
  margin: 20px auto;
  word-wrap: break-word;
`;

const CommentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); // Adjust minmax's first parameter based on your minimum comment size
  gap: 10px; // Minimal gap for slight spacing
  width: 100%;
  padding: 10px; // Padding around the grid inside the container
`;

const DefaultMessage = styled.p`
  text-align: left;
`;

const LoadingMessage = styled.p`
  text-align: left;
  font-size: 1.2em;
`;

const AllComments = ({ comments, setActiveComment, activeComment, bgColor, isLoading }) => {
  return (
    <Container>
      {isLoading ? (
        <LoadingMessage>loading comments...</LoadingMessage>
      ) : (
        <>
          <DefaultMessage>click on any icon to read the associated comment text.</DefaultMessage>
          <CommentsGrid>
            {comments.map(comment => {
              // Log the color for each comment
              console.log(`allcomments, ID: ${comment.id}, Color: ${comment.color}`);
              
              return (
              <Comment
                key={comment.id}
                color={comment.color}  // ✅ this matches styled-components
                isActive={activeComment && activeComment.id === comment.id}
                onClick={() => setActiveComment(comment)}
              />

              );
            })}
          </CommentsGrid>
        </>
      )}
    </Container>
  );
  
};

export default AllComments;
