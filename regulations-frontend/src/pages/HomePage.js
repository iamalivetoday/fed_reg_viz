import React from 'react';
import styled from 'styled-components';
import Typewriter from 'typewriter-effect';
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const HomePageContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-evenly;
  margin-top: 2%;
  margin-left: 5%;
  margin-bottom: 2%;
`;

const StyledContent = styled.div`
  font-size: 3rem;
  flex-direction: column;
  display: inline;
`;

const BodyText = styled.a`
  flex-direction: column;
  display: flex;
`;

const HomePage = () => {

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
        <HomePageContainer>
          <StyledContent>
            <BodyText>What do </BodyText>
            <Typewriter
              options={{
                showCursor: false,
                strings: ["we", "the people", "Americans", "you", "working people", "your friends", "our neighbors", "ordinary Americans", "other families"],
                autoStart: true,
                loop: true,
                pauseFor: 7000,
                delay: 800,
                deleteSpeed: 100,
              }}
            />
            <FaArrowRightLong 
              style={{ position: 'fixed', right: '1em', top: '1em' }} 
              size={140}
              onClick={() => handleNavigation('/agencies')} 
              onMouseOver={({target})=>target.style.color="green"}
              onMouseOut={({target})=>target.style.color="black"}
            />
            <BodyText>think about </BodyText>
            <BodyText>our proposed </BodyText>
            <BodyText
            > federal regulations? </BodyText>

          </StyledContent>
        </HomePageContainer>

    </>
    
  );
};

export default HomePage;
