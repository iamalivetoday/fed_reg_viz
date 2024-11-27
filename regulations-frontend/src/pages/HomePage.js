import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import ManateeImage from '../assets/manatee.jpg';
import SearchIcon from '../assets/search.png';

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  height: 88vh;
  width: 90%;
  overflow: hidden;
  position: relative;
  padding: 20px;
`;

const HorizontalText = styled.div`
  font-size: 2rem;
  font-weight: bold;
  text-align: left;
  color: #0A3161;
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const TypewriterWrapper = styled.span`
  margin-left: 4px;
  color: ${(props) => (props.isHovered ? '#550000' : '#0A3161')};
  font-style: ${(props) => (props.isHovered ? 'italic' : 'normal')};
  cursor: pointer;
  
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between; /* Push items to the edges */
  align-items: center;
  width: 100%; /* Take full width of the container */
  margin-top: 15px;
  margin-bottom: 30px;
  gap: 12px;

`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RightContainer = styled.div`
  display: flex;
  gap: 12px; /* Space between buttons */
`;

const SearchContainer = styled.div`
  width: 100%;
  max-width: 200px; /* Adjust the size of the search bar */
  display: flex;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 4px 10px 20px; /* Add left padding for the icon */
  border: 1px solid #ccc;
  border-radius: 25px;
  outline: none;
  background-image: url('../assets/search.png'); /* Add your icon here */
  background-position: left 10px center; /* Position the icon on the right */
  &:focus {
    border-color: #0A3161;
  }
`;

const NavItem = styled(NavLink)`
  text-decoration: none;
  color: #0A3161;
  font-weight: bold;
  padding: 10px 20px; /* Increase padding for larger clickable area */
  border-radius: 25px;
  border: 1px solid black;

  &.active {
    color: white;
    background-color: #0A3161; /* Highlight active link */
  }

  &:hover {
    background-color: #d3e2f1;
  }
`;

const TableContainer = styled.table`
  width: 90%;
  border-collapse: collapse;

  th, td {
    text-align: left;
    border: none;
    padding-top: 8px;
  }

  a {
    text-decoration: none;
    color: #0A3161;

    &:hover {
      font-style: italic;
    }
  }

  img {
    width: 50px;
    height: auto;
  }
`;

const HomePage = () => {
  const typewriterStrings = [
    "we", "the people", "you", "ordinary people", "strangers", "Americans", "students",
    "our unions", "you", "families", "working people", "veterans", "your friends",
    "our neighbors", "ordinary Americans", "other families"
  ];
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const regulations = [
    { image: ManateeImage, title: "FWS manatee critical habitat designations", link: "https://www.regulations.gov/docket/FWS-R4-ES-2024-0073" },
    { image: ManateeImage, title: "FTC’s survey on junk fees", link: "https://www.regulations.gov/document/FTC-2023-0064-0001" },
    { image: ManateeImage, title: "DOI’s proposed changes to Bears Ears national monument", link: "https://www.regulations.gov/document/DOI-2017-0002-0001" },
    { image: ManateeImage, title: "OSHA regulations update", link: "https://www.regulations.gov/document/OSHA-2021-0009-4761" },
    { image: ManateeImage, title: "FTC’s proposed rule on noncompetes", link: "https://www.regulations.gov/docket/FTC-2023-0007" },
    { image: ManateeImage, title: "Minimum wage for federal contractors", link: "https://www.regulations.gov/document/DOL_FRDOC_0001-0343" },
    { image: ManateeImage, title: "Clean Air Act Amendments", link: "https://www.google.com" },
    { image: ManateeImage, title: "Clean Water Rule", link: "https://www.google.com" },
    { image: ManateeImage, title: "Mercury and Air Toxics Standards", link: "https://www.google.com" },
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
      <HorizontalText>
        what do&nbsp;
        <TypewriterWrapper
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          isHovered={hovered}
        >
          {hovered ? (
            <span>you</span>
          ) : (
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
          )}
        </TypewriterWrapper>{' '}
      </HorizontalText>
      <HorizontalText>think of our proposed federal regulations?</HorizontalText>

      <Navbar>
        {/* Left side with the search bar */}
        <LeftContainer>
        <SearchContainer>
          <SearchInput type="text" placeholder="Search..."></SearchInput>
        </SearchContainer>
        </LeftContainer>

        {/* Right side with buttons */}
        <RightContainer>
          <NavItem to="/about" activeClassName="active">About</NavItem>
          <NavItem to="/agencies" activeClassName="active">Agencies</NavItem>
        </RightContainer>
      </Navbar>


      <TableContainer>
        <tbody>
          {regulations.map((regulation, index) => (
            <tr key={index}>
              <td>
                <a href={regulation.link} target="_blank" rel="noopener noreferrer">
                  {regulation.title}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </TableContainer>
    </HomePageContainer>
  );
};

export default HomePage;
