import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { BsArrowDownCircle } from 'react-icons/bs';
import HomeNavBar from '../components/HomeNavBar';
const words = ["we", "the people", "Americans", "you", "working people", "our neighbors", "ordinary people", "other families"];

const HomePageContainer = styled.div`
  background-color: #13151C;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Arrow = styled(BsArrowDownCircle)`
  color: white;
  font-size: 3rem;
  cursor: pointer;
  margin-top: 30px;
`;

const ContentSection = styled.section`
  color: white;
  background: #13151C;
  padding: 8rem;
`;

const LoremIpsum = styled.p`
  margin-top: 2rem;
`;

const StyledText = styled.div`
  font-size: 5em;
  text-align: left;
`;

const DynamicTextContainer = styled.div`
  display: inline-block;
  width: 800px; // Adjust the width based on the widest word
  text-align: left;
`;

const fadeInOut = keyframes`
  0% { opacity: 0; }
  40% { opacity: 0.4; }
  50% { opacity: 0.5; }
  60% { opacity: 0.4; }
  100% { opacity: 0; }
`;

const DynamicWord = styled.span`
  font-size: 1.5em;
  animation: ${fadeInOut} 10s ease-in-out infinite;
`;

const HomePage = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeSticky = window.scrollY > 150; // Adjust based on your layout
      setIsSticky(shouldBeSticky);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setWordIndex(prevIndex => (prevIndex + 1) % words.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <>
      <HomePageContainer>
        <StyledText>
          What do <br/>
          <DynamicTextContainer>
            <DynamicWord>{words[wordIndex]}</DynamicWord>
          </DynamicTextContainer> <br/>
          think about <br/>
          our proposed regulations?<br/>
        </StyledText>
        <HomeNavBar sticky={isSticky} />
        <Arrow onClick={scrollToContent} />
      </HomePageContainer>
      <ContentSection>
        <StyledText>About</StyledText>
        <LoremIpsum>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</LoremIpsum>
      </ContentSection>
    </>
  );
};

export default HomePage;
