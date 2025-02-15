import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import ManateeImage from '../assets/search.png';
import SearchBar from '../components/SearchBar';

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  height: 95vh;
  width: 100%;
  background-color: white;
  position: relative;
  padding: 20px;
`;

const HorizontalText = styled.div`
  font-size: 4rem;
  text-align: left;
  color: #0A3161;
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  margin-right: 12px;
  padding-right: 12px;
`;

const TypewriterWrapper = styled.span`
  margin-left: 4px;
  padding-left: 8px;
  cursor: pointer;
  
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between; /* Push items to the edges */
  align-items: center;
  width: 96%; /* Take full width of the container */
  margin-top: 15px;
  margin-bottom: 10px;
  gap: 12px;

`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  text-align: center;
`;

const RightContainer = styled.div`
  display: flex;
  gap: 12px; /* Space between buttons */
`;


const DocumentsContainer = styled.div`
  position: absolute;
  bottom: 40%;
  right: 10%;
  background: rgba(255, 255, 255, 0.9);
  padding: 15px;
  border-radius: 10px;
  max-width: 300px;
`;

const DocumentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DocumentItem = styled.li`
  margin-bottom: 8px;
`;

const DocumentLink = styled.a`
  text-decoration: none;
  color: #0A3161;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;
const NavItem = styled(NavLink)`
  text-decoration: none;
  color: #0A3161;
  padding: 10px 10px 10px 10px; /* Adjust padding to leave space for the icon */
  border: 1px solid #ccc;
  border-radius: 25px; /* Match the buttons */
  width: 100%;
  align-items: center;
  transition: all 0.3s ease; /* Smooth hover transition */
  font-size: 16px; /* Improve text readability */

  &:hover {
    border-color: #0A3161; /* Slightly change border color */
  }hat

  &:focus {
    outline: none;
    border-color: #0A3161; /* Slightly change border color */
  }
  
`;

const HomePage = () => {
  const typewriterStrings = [
    "we", "the people", "you", "ordinary people", "strangers", "Americans", "students",
    "our unions", "you", "families", "working people", "veterans", "your friends",
    "our neighbors", "other families"
  ];
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    fetch("/api/trending-docs")
      .then(response => response.json())
      .then(data => setDocuments(data))
      .catch(error => console.error("Error fetching documents:", error));
  }, []);

  const regulations = [
    { image: ManateeImage, title: "critical habitat designations", link: "https://www.regulations.gov/docket/FWS-R4-ES-2024-0073" },
    { image: ManateeImage, title: "junk fees", link: "https://www.regulations.gov/document/FTC-2023-0064-0001" },
    { image: ManateeImage, title: "national monuments", link: "https://www.regulations.gov/document/DOI-2017-0002-0001" },
    { image: ManateeImage, title: "workplace health", link: "https://www.regulations.gov/document/OSHA-2021-0009-4761" },
    { image: ManateeImage, title: "noncompetes", link: "https://www.regulations.gov/docket/FTC-2023-0007" },
    { image: ManateeImage, title: "minimum wage for contractors", link: "https://www.regulations.gov/document/DOL_FRDOC_0001-0343" },
    { image: ManateeImage, title: "net neutrality", link: "https://www.google.com" },
    { image: ManateeImage, title: "clean water", link: "https://www.google.com" },
    { image: ManateeImage, title: "fair housing accessibility", link: "https://www.google.com" },
    { image: ManateeImage, title: "Fuel Economy Standards (CAFE)", link: "https://www.google.com" },
    { image: ManateeImage, title: "Endangerment Finding", link: "https://www.google.com" },
    { image: ManateeImage, title: "Cross-State Air Pollution Rule", link: "https://www.google.com" },
    { image: ManateeImage, title: "Renewable Fuel Standard", link: "https://www.google.com" },
    { image: ManateeImage, title: "National Ambient Air Quality Standards", link: "https://www.google.com" },
    { image: ManateeImage, title: "Coal Ash Disposal Rule", link: "https://www.google.com" },
    { image: ManateeImage, title: "Affordable Clean Energy Rule", link: "https://www.google.com" },
    { image: ManateeImage, title: "Occupational Noise Standard", link: "https://www.google.com" },
    { image: ManateeImage, title: "Hazard Communication Standard", link: "https://www.google.com" },
    { image: ManateeImage, title: "Bloodborne Pathogens Standard", link: "https://www.google.com" },
    { image: ManateeImage, title: "Respirable Crystalline Silica Rule", link: "https://www.google.com" },
    { image: ManateeImage, title: "COVID-19 Emergency Temporary Standards", link: "https://www.google.com" },
    { image: ManateeImage, title: "Qualified Mortgage Rule", link: "https://www.google.com" },
    { image: ManateeImage, title: "Regulation Best Interest", link: "https://www.google.com" },
    { image: ManateeImage, title: "Credit CARD Act", link: "https://www.google.com" },
    { image: ManateeImage, title: "Payday Lending Rule", link: "https://www.google.com" },
    { image: ManateeImage, title: "Identity Theft Red Flags Rule", link: "https://www.google.com" },
    { image: ManateeImage, title: "Tobacco Control Act", link: "https://www.google.com" },
    { image: ManateeImage, title: "Nutrition Labeling Rule", link: "https://www.google.com" },
    { image: ManateeImage, title: "Menu Labeling Rule", link: "https://www.google.com" },
    { image: ManateeImage, title: "Deeming Rule", link: "https://www.google.com" },
    { image: ManateeImage, title: "Emergency Use Authorization Rule", link: "https://www.google.com" },
    { image: ManateeImage, title: "Medicare Part D Rules", link: "https://www.google.com" },
    { image: ManateeImage, title: "Electronic Logging Device Mandate", link: "https://www.google.com" },
    { image: ManateeImage, title: "Automatic Emergency Braking Requirement", link: "https://www.google.com" },
    { image: ManateeImage, title: "Runway Safety Regulations", link: "https://www.google.com" },
    { image: ManateeImage, title: "Drone Registration Rule", link: "https://www.google.com" },
    { image: ManateeImage, title: "Hours of Service Rule", link: "https://www.google.com" },
    { image: ManateeImage, title: "Energy Efficiency Standards", link: "https://www.google.com" },
    { image: ManateeImage, title: "Pipeline Safety Rule", link: "https://www.google.com" },
    { image: ManateeImage, title: "Net Metering Rules", link: "https://www.google.com" },
    { image: ManateeImage, title: "Transmission Line Regulation", link: "https://www.google.com" },
    { image: ManateeImage, title: "Children’s Online Privacy Protection Act Rule", link: "https://www.google.com" },
    { image: ManateeImage, title: "Do-Not-Call Implementation Act", link: "https://www.google.com" },
    { image: ManateeImage, title: "Net Neutrality Rules", link: "https://www.google.com" },
    { image: ManateeImage, title: "Data Breach Notification Rules", link: "https://www.google.com" },
    { image: ManateeImage, title: "Fair Housing Accessibility Guidelines", link: "https://www.google.com" },
    { image: ManateeImage, title: "Affirmatively Furthering Fair Housing Rule", link: "https://www.google.com" },
    { image: ManateeImage, title: "Lead Safe Housing Rule", link: "https://www.google.com" },
    { image: ManateeImage, title: "Gainful Employment Rule", link: "https://www.google.com" },
    { image: ManateeImage, title: "Organic Standards", link: "https://www.google.com" },
    { image: ManateeImage, title: "Poultry Inspection Rule", link: "https://www.google.com" },
    { image: ManateeImage, title: "Food Safety Modernization Act Rules", link: "https://www.google.com" }
  ];
  

  return (
    <HomePageContainer>
      <br/><br/>
      <HorizontalText>
        what do
        <TypewriterWrapper
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          isHovered={hovered}
        >
          <Typewriter
              options={{
                strings: typewriterStrings,
                autoStart: true,
                loop: true,
                deleteSpeed: 300,
                delay: 250,
                pauseFor: 1000,
              }}
            />
        </TypewriterWrapper>
      </HorizontalText>
      <HorizontalText>think of our proposed federal regulations?</HorizontalText>

      <Navbar>
        <LeftContainer> 
          <SearchBar/>
        </LeftContainer>
        <br/><br/>
      </Navbar>

      <RightContainer>
        <NavItem to="/about" activeClassName="active">about</NavItem>
        <NavItem to="/agencies" activeClassName="active">agencies</NavItem>
      </RightContainer>

      <DocumentsContainer>
        <h4>Trending Documents</h4>
        <DocumentList>
          {documents.map((doc, index) => (
            <DocumentItem key={index}>
              <DocumentLink href={doc.link} target="_blank" rel="noopener noreferrer">{doc.title}</DocumentLink>
            </DocumentItem>
          ))}
        </DocumentList>
      </DocumentsContainer>
    </HomePageContainer>
  );
};

export default HomePage;
