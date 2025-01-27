import React from 'react';
import styled from 'styled-components';
import Comment from './Comment';

const Container = styled.div`
  width: 92%;
  min-height: 300px; // Adjust this value based on your needs
  margin: 10px auto;
  background-color: white;
  border: 1px solid #333;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box; // Ensures padding does not add to the width
  max-height: 500px; /* Adjust as needed */
  overflow-y: auto;
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
    <Container bgColor={bgColor}>
      {isLoading ? (
        <LoadingMessage>loading comments...</LoadingMessage>
      ) : (
        <>
          <DefaultMessage>click on any icon to read the associated comment text.</DefaultMessage>
          <CommentsGrid bgColor={bgColor}>
            {comments.map(comment => {
              // Log the color for each comment
              console.log(`allcomments, ID: ${comment.id}, Color: ${comment.color}`);
              
              return (
                <Comment
                  key={comment.id}
                  thecolor={comment.color}
                  isActive={activeComment && activeComment.id === comment.id}
                  onClick={() => setActiveComment(comment)}
                  style={{
                    backgroundColor: comment.color
                  }}
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
