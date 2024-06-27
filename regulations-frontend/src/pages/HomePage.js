import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typewriter from 'typewriter-effect';
import { GoArrowRight } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

const HomePageContainer = styled.div`
  display: flex;
  height: 100vh; /* Make sure it covers the full height of the viewport */
  width: 100%;
  position: relative;
  background-size: cover;
  background-size: 100vw 100vh;
  background-position: center;
  /* Remove background image on small screens */
  @media (max-width: 710px) {
    background-image: none;
  }
`;

const StyledContent = styled.div`
  position: absolute;
  margin: 20px;
  padding: 20px;
  text-align: left;
  color: black;
`;

const BodyText = styled.div`
  font-size: 12vh;
  @media (max-width: 710px) {
    font-size: 10vh;
  }
`;

const TypewriterWrapper = styled.div`
  font-size: 12vh; /* Set the font size to match BodyText */
  @media (max-width: 710px) {
    font-size: 10vh;
  }
`;

const ArrowContainer = styled.div`
  position: fixed;
  right: 0px;
  top: -20px;
  cursor: pointer;

  @media (max-width: 710px) {
    right: 20%;
    top: 20%;
    transform: translate(50%, -50%);
  }
`;

const HomePage = () => {
  const navigate = useNavigate();
  const [arrowSize, setArrowSize] = useState(window.innerWidth < 710 ? 240 : 150);

  useEffect(() => {
    const handleResize = () => {
      setArrowSize(window.innerWidth < 710 ? 240 : 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <HomePageContainer>
      <StyledContent>
        <BodyText>What do </BodyText>
        <TypewriterWrapper>
          <Typewriter
            options={{
              showCursor: false,
              strings: ["we", "ordinary people", "Americans", "students", "our unions", "you", "families", "working people", "veterans", "your friends", "our neighbors", "ordinary Americans", "other families"],
              autoStart: true,
              loop: true,
              pauseFor: 4000,
              delay: 800,
              deleteSpeed: 100,
            }}
          />
        </TypewriterWrapper>
        <BodyText>think about </BodyText>
        <BodyText>our proposed </BodyText>
        <BodyText>federal regulations?</BodyText>
        <ArrowContainer>
          <GoArrowRight
            size={arrowSize}
            onClick={() => handleNavigation('/agencies')}
            onMouseOver={({ target }) => target.style.color = 'green'}
            onMouseOut={({ target }) => target.style.color = 'black'}
          />
        </ArrowContainer>
      </StyledContent>
    </HomePageContainer>
  );
};

export default HomePage;
