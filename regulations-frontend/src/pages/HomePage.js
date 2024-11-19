import React from 'react';
import styled from 'styled-components';
import Typewriter from 'typewriter-effect';
import { useParams, useNavigate } from 'react-router-dom';

// Import images from the assets folder
import ManateeImage from '../assets/manatee.jpg';

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  height: 88vh;
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 20px;
`;

const HorizontalText = styled.div`
  font-size: 1rem;
  font-weight: bold;
  text-align: left;
  color: #0A3161;
  display: flex;
  align-items: center; /* Aligns "what do" and Typewriter effect on the same line */
  margin-bottom: 4px;
`;

const TypewriterWrapper = styled.span`
  margin-left: 4px;
`;

const Subheading = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
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
    width: 50px; /* Adjust size as needed */
    height: auto;
  }
`;

const HomePage = () => {
  const typewriterStrings = [
    "we", "the people", "you", "ordinary people", "strangers", "Americans", "students",
    "our unions", "you", "families", "working people", "veterans", "your friends",
    "our neighbors", "ordinary Americans", "other families"
  ];
  const shuffledStrings = typewriterStrings.sort(() => Math.random() - 0.5);

  const regulations = [
    {
      image: ManateeImage,
      title: "FWS manatee critical habitat designations",
      link: "https://www.regulations.gov/docket/FWS-R4-ES-2024-0073"
    },
    {
      image: ManateeImage,
      title: "FTC’s survey on junk fees",
      link: "https://www.regulations.gov/document/FTC-2023-0064-0001"
    },
    {
      image: ManateeImage,
      title: "DOI’s proposed changes to Bears Ears national monument",
      link: "https://www.regulations.gov/document/DOI-2017-0002-0001"
    },
    {
      image: ManateeImage,
      title: "OSHA regulations update",
      link: "https://www.regulations.gov/document/OSHA-2021-0009-4761"
    },
    {
      image: ManateeImage,
      title: "FTC’s proposed rule on noncompetes",
      link: "https://www.regulations.gov/docket/FTC-2023-0007"
    },
    {
      image: ManateeImage,
      title: "Minimum wage for federal contractors",
      link: "https://www.regulations.gov/document/DOL_FRDOC_0001-0343"
    }
  ];

  return (
    <HomePageContainer>
      <HorizontalText>
        what do{' '}
        <TypewriterWrapper>
          <Typewriter
            options={{
              strings: shuffledStrings,
              autoStart: true,
              loop: true,
              deleteSpeed: 300,
              delay: 250,
              pauseFor: 1000,
            }}
          />
        </TypewriterWrapper>{' '}
      </HorizontalText>
      <HorizontalText>think of our proposed federal regulations?</HorizontalText>
      <br/><br/>
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
