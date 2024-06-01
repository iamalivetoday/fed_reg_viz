import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { BsArrowDownCircle } from 'react-icons/bs';
import HomeNavBar from '../components/HomeNavBar';
import Typewriter from 'typewriter-effect';

const HomePageContainer = styled.div`
  background-color: white;

  color: black;
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

const StyledContent = styled.div`
  font-size: 3em;
  margin-left: 8%;
  display: inline-block;
`;

const fadeInOut = keyframes`
  0%, 100% { opacity: 0; }
  25%, 50% { opacity: 1; }    // Full visibility quickly
  75% { opacity: 0.6; }    /
`;

const Subheading = styled.i`
  margin-top: 10px;
  font-size: 0.4em; // Adjust based on your preference
`;

const BodyText = styled.p`
  font-size: 0.4em; // Adjust based on your preference
`;

const HomePage = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeSticky = window.scrollY > 150; // Adjust based on your layout
      setIsSticky(shouldBeSticky);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <>
        <HomePageContainer>
          <StyledText>
            What do <br/>
            <Typewriter
              options={{
                strings: ["we", "the people", "Americans", "you", "working people", "our neighbors", "ordinary people", "other families"],
                autoStart: true,
                loop: true,
              }}
            />
            think about <br/>
            our proposed federal regulations?<br/>
          </StyledText>
          <HomeNavBar sticky={isSticky} />
          <Arrow onClick={scrollToContent} />
        </HomePageContainer>
        <HomePageContainer>
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

    </>
    
  );
};

export default HomePage;
