import React, { useState } from 'react';
import styled from 'styled-components';
import Typewriter from 'typewriter-effect';
import { useNavigate } from 'react-router-dom';
import { GoArrowRight } from 'react-icons/go';

const HomePageContainer = styled.div`
  display: grid;
  height: 95vh;
  width: 100%;
  position: relative;
`;

const StyledContent = styled.div`
  position: absolute;
  top: 0%;
  left: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: justify;
  color: black;
`;

const HoverableText = styled.div`
  font-size: 10vh;
  cursor: pointer;
  position: relative;
  display: inline-block;
  margin: 20px 0;

  &:hover .text-content {
    visibility: hidden;
  }

  &:hover .arrow-icon {
    visibility: visible;
  }
`;

const TypewriterWrapper = styled.div`
  display: inline;
`;

const ArrowIcon = styled(GoArrowRight)`
  position: absolute;
  font-size: inherit;
  color: green;
  visibility: hidden;
`;

const MiddleText = styled.div`
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
  text-align: right;
`;

const LowerLeftText = styled.div`
  position: absolute;
  top: 60%;
  left: 5%;
`;

const LowerRightText = styled.div`
  position: absolute;
  top: 80%;
  right: 3%;
  text-align: right;
`;

const HomePage = () => {
  const navigate = useNavigate();
  const [hoveredText, setHoveredText] = useState(null);
  const [hoveredPosition, setHoveredPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e, text) => {
    setHoveredText(text);
    setHoveredPosition({ x: 0, y: 0});
  };

  const handleMouseLeave = () => {
    setHoveredText(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const typewriterStrings = [
    "we", "the people", "you", "ordinary people", "strangers", "Americans", "students",
    "our unions", "you", "families", "working people", "veterans", "your friends",
    "our neighbors", "ordinary Americans", "other families"
  ];
  const shuffledStrings = typewriterStrings.sort(() => Math.random() - 0.5);

  return (
    <HomePageContainer>
      <StyledContent>
        <HoverableText
          onClick={() => handleNavigation('/agencies')}
          onMouseEnter={(e) => handleMouseEnter(e, 'what do')}
          onMouseLeave={handleMouseLeave}
        >
          <span className="text-content">what do </span>
          {hoveredText === 'what do' && (
            <ArrowIcon
              className="arrow-icon"
              style={{ top: hoveredPosition.y, left: hoveredPosition.x }}
            />
          )}
        </HoverableText>
        <HoverableText
          onMouseEnter={(e) => handleMouseEnter(e, 'typewriter')}
          onMouseLeave={handleMouseLeave}
        >
          <span className="text-content">
            <TypewriterWrapper>
              <Typewriter
                options={{
                  showCursor: false,
                  strings: shuffledStrings,
                  autoStart: true,
                  loop: true,
                  pauseFor: 500,
                  delay: 200,
                  deleteSpeed: 100,
                }}
              />
            </TypewriterWrapper>
          </span>
          {hoveredText === 'typewriter' && (
            <ArrowIcon
              className="arrow-icon"
              style={{ top: hoveredPosition.y, left: hoveredPosition.x }}
            />
          )}
        </HoverableText>
      </StyledContent>
      <MiddleText>
        <HoverableText
          onClick={() => handleNavigation('/agencies')}
          onMouseEnter={(e) => handleMouseEnter(e, 'think about')}
          onMouseLeave={handleMouseLeave}
        >
          <span className="text-content">think about</span>
          {hoveredText === 'think about' && (
            <ArrowIcon
              className="arrow-icon"
              style={{ top: hoveredPosition.y, left: hoveredPosition.x }}
            />
          )}
        </HoverableText>
      </MiddleText>
      <LowerLeftText>
        <HoverableText
          onClick={() => handleNavigation('/agencies')}
          onMouseEnter={(e) => handleMouseEnter(e, 'our proposed')}
          onMouseLeave={handleMouseLeave}
        >
          <span className="text-content">our proposed</span>
          {hoveredText === 'our proposed' && (
            <ArrowIcon
              className="arrow-icon"
              style={{ top: hoveredPosition.y, left: hoveredPosition.x }}
            />
          )}
        </HoverableText>
      </LowerLeftText>
      <LowerRightText>
        <HoverableText
          onClick={() => handleNavigation('/agencies')}
          onMouseEnter={(e) => handleMouseEnter(e, 'federal regulations')}
          onMouseLeave={handleMouseLeave}
        >
          <span className="text-content">federal regulations?</span>
          {hoveredText === 'federal regulations' && (
            <ArrowIcon
              className="arrow-icon"
              style={{ top: hoveredPosition.y, left: hoveredPosition.x }}
            />
          )}
        </HoverableText>
      </LowerRightText>
    </HomePageContainer>
  );
};

export default HomePage;
