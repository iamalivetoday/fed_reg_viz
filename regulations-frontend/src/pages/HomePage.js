import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { BsArrowDownCircle } from 'react-icons/bs';
import HomeNavBar from '../components/HomeNavBar';
import Dot from '../components/Dot';

const words = ["we", "the people", "Americans", "you", "working people", "our neighbors", "ordinary people", "other families"];
const colors = ["#FF6347", "#4682B4", "#32CD32", "#FFD700", "#FF69B4", "#00BFFF", "#8A2BE2"]; // Vibrant crayon box colors

const HomePageContainer = styled.div`
  background-color: #13151C;
  color: white;
  margin-top: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Arrow = styled(BsArrowDownCircle)`
  color: white;
  font-size: 3rem;
  cursor: pointer;
  margin-top: 10%;
`;


const StyledText = styled.div`
  font-size: 3em;
  text-align: left;
`;

const AlignmentContainer = styled.div`
  text-align: left;
  margin-left: 10%;
  margin-right: 10%;
`;

const StyledContent = styled.div`
  font-size: 3em;
  margin-left: 8%;
  display: inline-block;
`;
const DynamicTextContainer = styled.div`
  display: inline-block;
  width: 100%; // Adjust the width based on the widest word
`;

const fadeInOut = keyframes`
  0%, 100% { opacity: 0; }
  25%, 50% { opacity: 1; }    // Full visibility quickly
  75% { opacity: 0.6; }    /
`;


const DynamicWord = styled.span`
  font-size: 1.5em;
  animation: ${fadeInOut} 10s ease-out infinite;  // Changed from 'ease-out' to 'linear' for a consistent speed
  text-shadow: 1px 1px 4px #FFF; // White outline for legibility
  color: ${props => props.color}
`;

const Subheading = styled.i`
  margin-top: 10px;
  font-size: 0.4em; // Adjust based on your preference
`;

const BodyText = styled.p`
  font-size: 0.4em; // Adjust based on your preference
`;

const HomePage = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [textColor, setTextColor] = useState(colors[0]);

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
      setWordIndex(prevIndex => {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * words.length);
        } while (randomIndex === prevIndex); // Ensure the new index is different from the current one
        return randomIndex;
      });
      setTextColor(colors[Math.floor(Math.random() * colors.length)]);
    }, 10000);
  
    return () => clearInterval(intervalId);
  }, []);



  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <>
      <AlignmentContainer>
        <HomePageContainer>
          <Dot />
          <StyledText>
            What do <br/>
            <DynamicTextContainer>
              <DynamicWord color={textColor}>{words[wordIndex]}</DynamicWord>
            </DynamicTextContainer> <br/>
            think about <br/>
            our proposed regulations?<br/>
          </StyledText>
          <HomeNavBar sticky={isSticky} />
          <Arrow onClick={scrollToContent} />
        </HomePageContainer>
        <HomePageContainer>
          <Dot />
          <StyledContent>
            About <br />
            <Subheading>Your voice in federal decision making</Subheading>
            <BodyText>
              <a href="https://www.regulations.gov">regulations.gov</a> is a federal website intended to Enable Public Access to Regulatory Materials, 
              Increase Rulemaking participation, and improve Agencies' Efficiency & Effectiveness. 
              This website, which is not an official website of the US government, uses the regulations.gov API 
              to help make proposed regulatory materials easier to navigate.
            </BodyText>
          </StyledContent>
        </HomePageContainer>
      </AlignmentContainer>

    </>
    
  );
};

export default HomePage;
