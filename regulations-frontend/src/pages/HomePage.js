import React from 'react';
import styled from 'styled-components';
import Typewriter from 'typewriter-effect';

const HomePageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  height: 95vh;
  width: 100%;
  position: relative;
`;

const HorizontalText = styled.div`
  font-size: 1rem;
  font-weight: bold;
  text-align: left;
  padding-left: 8px;
  color: black;
  position: absolute;
  display: flex; /* Ensures inline behavior */
  top: 5%;
`;

const TypewriterWrapper = styled.span`
  display: inline; /* Makes sure it stays inline */
  margin-left: 4px; /* Adds space before the typewriter */
  margin-right: 4px; 
`;

const HomePage = () => {
  const typewriterStrings = [
    "we", "the people", "you", "ordinary people", "strangers", "Americans", "students",
    "our unions", "you", "families", "working people", "veterans", "your friends",
    "our neighbors", "ordinary Americans", "other families"
  ];
  const shuffledStrings = typewriterStrings.sort(() => Math.random() - 0.5);

  return (
    <HomePageContainer>
      <HorizontalText>
        what do {'  '}
        <TypewriterWrapper>
          <Typewriter
            options={{
              strings: shuffledStrings,
              autoStart: true,
              loop: true,
              deleteSpeed: 300,
              delay: 250,
              pauseFor: 1000,
            }}
          />
        </TypewriterWrapper>{' '}
        think of our proposed federal regulations?
      </HorizontalText>
    </HomePageContainer>
  );
};

export default HomePage;
