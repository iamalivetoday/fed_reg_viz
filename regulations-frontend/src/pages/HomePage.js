import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { BsArrowDownCircle } from 'react-icons/bs';

// Define words for the typewriter effect
const words = ["Americans", "you", "our neighbors", "I", "we", "the people", "other families"];

const HomePageContainer = styled.div`
  background: #13151C;
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 80px;
  align-items: center;
`;

const Arrow = styled(BsArrowDownCircle)`
  color: white;
  font-size: 3rem;
  cursor: pointer;
  margin-top: 2rem;
`;

const ContentSection = styled.section`
  color: white;
  background: #13151C;
  padding: 4rem;
  margin-top: -4rem;
`;

const LoremIpsum = styled.p`
  margin-top: 2rem;
`;

const typing = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const erasing = keyframes`
  from { width: 100%; }
  to { width: 0; }
`;

const blinkCaret = keyframes`
  50% { border-color: transparent; }
`;

const TextWrapper = styled.div`
  text-align: center;
  font-size: 5rem;
  padding: 2rem;
`;

const DynamicText = styled.span`
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid white;
  animation: ${({ animate }) => css`
    ${animate === "typing" ? typing : erasing} 4s steps(30, end) forwards,
    ${blinkCaret} 0.75s step-end infinite
  `};
`;

const HomePage = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [animate, setAnimate] = useState("typing");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimate((prevAnimate) => (prevAnimate === "typing" ? "erasing" : "typing"));
      if (animate === "erasing") {
        setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }
    }, 8000); // Change the animation cycle every 8 seconds

    return () => clearInterval(intervalId);
  }, [animate, wordIndex]);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <>
      <HomePageContainer>
        <TextWrapper>
          What do <br />
          <DynamicText animate={animate}>{words[wordIndex]}</DynamicText> <br />
          think about <br />
          these proposed regulations?
        </TextWrapper>
        <Arrow onClick={scrollToContent} />
      </HomePageContainer>
      <ContentSection>
        <h1>About</h1>
        <LoremIpsum>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</LoremIpsum>
      </ContentSection>
    </>
  );
};

export default HomePage;
