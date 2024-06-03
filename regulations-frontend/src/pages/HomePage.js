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
  align-items: left;
  justify-content: center;
  margin-top: 2%;
  margin-left: 5%;
`;

const StyledContent = styled.div`
  font-size: 10em;
  display: inline-block;
`;


const BodyText = styled.a`
  margin: none;
  padding: none;
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
            What do <br/>
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
            think about <br/>
            <BodyText
            > our proposed federal regulations? </BodyText>
            <FaArrowRightLong 
              style={{ position: 'relative', left: '30px', top: '30px' }} 
              onClick={() => handleNavigation('/agencies')} 
              onMouseOver={({target})=>target.style.color="green"}
              onMouseOut={({target})=>target.style.color="black"}
            />
          </StyledContent>
        </HomePageContainer>

    </>
    
  );
};

export default HomePage;
