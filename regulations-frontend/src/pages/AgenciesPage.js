import React, { useState } from 'react';
import AgencyButton from '../components/AgencyButton'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const agencies = [
  { acronym: "FTC", fullName: "Federal Trade Commission", currentChair: "Lina Khan", description: "Protects consumers and promotes competition" },
  { acronym: "NRC", fullName: "Nuclear Regulatory Commission", currentChair: "Christopher T. Hanson", description: "Regulates nuclear power plants and materials" },
  { acronym: "FDA", fullName: "Food and Drug Administration", currentChair: "Robert M. Califf", description: "Ensures safety of food and drugs" },
  { acronym: "FAA", fullName: "Federal Aviation Administration", currentChair: "Steve Dickson", description: "Regulates civil aviation" },
  { acronym: "SSA", fullName: "Social Security Administration", currentChair: "Kilolo Kijakazi", description: "Manages social security" },
  { acronym: "FDIC", fullName: "Federal Deposit Insurance Corporation", currentChair: "Martin J. Gruenberg", description: "Insures deposits in banks" },
  { acronym: "EPA", fullName: "Environmental Protection Agency", currentChair: "Michael S. Regan", description: "Protects human health and the environment" },
  { acronym: "BIS", fullName: "Bureau of Industry and Security", currentChair: "Cordell Hull", description: "Promotes export control and security" },
  { acronym: "OSH", fullName: "Occupational Safety and Health Administration", currentChair: "Doug Parker", description: "Ensures safe and healthful working conditions" },
  { acronym: "CDC", fullName: "Centers for Disease Control and Prevention", currentChair: "Rochelle Walensky", description: "Protects public health and safety" },
  { acronym: "CMM", fullName: "Centers for Medicare and Medicaid", currentChair: "Chiquita Brooks-LaSure", description: "Administers Medicare and Medicaid" },
  { acronym: "DOC", fullName: "Department of Commerce", currentChair: "Gina Raimondo", description: "Promotes economic growth" },
  { acronym: "DOA", fullName: "Department of Agriculture", currentChair: "Tom Vilsack", description: "Develops and executes farming policies" },
  { acronym: "DOE", fullName: "Department of Education", currentChair: "Miguel Cardona", description: "Oversees federal education policies" },
  { acronym: "DOI", fullName: "Department of the Interior", currentChair: "Deb Haaland", description: "Manages public lands and resources" },
  { acronym: "DOL", fullName: "Department of Labor", currentChair: "Marty Walsh", description: "Improves working conditions" },
  { acronym: "DOD", fullName: "Department of Defense", currentChair: "Lloyd Austin", description: "Provides military forces" },
  { acronym: "DOT", fullName: "Department of Transportation", currentChair: "Pete Buttigieg", description: "Oversees federal transportation projects" },
  { acronym: "DHS", fullName: "Department of Homeland Security", currentChair: "Alejandro Mayorkas", description: "Ensures national security" },
  { acronym: "HUD", fullName: "Department of Housing and Urban Development", currentChair: "Marcia Fudge", description: "Develops housing policies" },
  { acronym: "VA", fullName: "Department of Veteran's Affairs", currentChair: "Denis McDonough", description: "Provides veterans' benefits" },
  { acronym: "DOJ", fullName: "Department of State", currentChair: "Antony Blinken", description: "Handles foreign affairs" },
  { acronym: "HHS", fullName: "Department of Health and Human Services", currentChair: "Xavier Becerra", description: "Protects health of all Americans" },
  { acronym: "NSF", fullName: "National Parks Service", currentChair: "Charles F. Sams III", description: "Manages national parks" },
  { acronym: "IRS", fullName: "Internal Revenue Services", currentChair: "Charles Rettig", description: "Collects federal taxes" },
  { acronym: "NSF", fullName: "National Science Foundation", currentChair: "Sethuraman Panchanathan", description: "Promotes scientific research" },
  { acronym: "NASA", fullName: "National Aeronautics and Space Administration", currentChair: "Bill Nelson", description: "Explores space" },
  { acronym: "USA", fullName: "Army", currentChair: "James C. McConville", description: "Provides land-based military operations" },
  { acronym: "USN", fullName: "Navy", currentChair: "Michael Gilday", description: "Conducts naval operations" },
  { acronym: "USCG", fullName: "Coast Guard", currentChair: "Karl L. Schultz", description: "Provides maritime security" },
  { acronym: "USAF", fullName: "Air Force", currentChair: "Charles Q. Brown Jr.", description: "Conducts aerial operations" },
];

const AgenciesPageContainer = styled.div`
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Header = styled.div`
  width: 85%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center; /* Adjusted to center items vertically */
  margin-bottom: 20px;
`;

const Title = styled.div`
  margin-top: 0;
  font-size: 2em;
  text-align: left;
`;


const ToggleButton = styled.button`
  padding: 10px;
  font-size: 1em;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 5px;
  max-width: 200px; /* adjust this as needed */
  text-align: center;

  &:hover {
    font-style: italic;
  }

  /* reduce font size if text overflows */
  @media (min-width: 0px) {
    & {
      font-size: calc(1em - (0.1em * (100vw / 200px)));
    }
  }
`;

const AgencyTable = styled.table`
  width: 85%;
  margin-top: 20px;
  border-collapse: collapse;
  border: 1px solid black; /* Change the border color to black */
  th, td {
    border: 1px solid black; /* Change the border color to black */
    padding: 8px;
    text-align: left;
  }
  th {
    color: black;
  }
`;

const AgencyButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Adjust the gap as needed */
  justify-content: center;
  width: 100%; /* Set width to 80% to match the table and header */
  margin-top: 20px;
`;

const AgenciesPage = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('buttons'); // Default view is 'buttons'

  const handleAgencyClick = (agencyAcronym) => {
    navigate(`/dockets/${agencyAcronym}`);
  };

  const toggleView = () => {
    setView(view === 'buttons' ? 'table' : 'buttons');
  };

  return (
    <AgenciesPageContainer>
      <Header>
        <Title>Some of our beautiful federal agencies</Title>
        <ToggleButton onClick={toggleView}>
          {view === 'buttons' ? 'Show Table' : 'Show Buttons'}
        </ToggleButton>
      </Header>
      {view === 'buttons' ? (
        <AgencyButtonsContainer>
          {agencies.map((agency) => (
            <AgencyButton 
              key={agency.acronym} 
              agencyId={agency.acronym} 
              fullAgencyName={agency.fullName}
              onClick={() => handleAgencyClick(agency.acronym)}
            />
          ))}
        </AgencyButtonsContainer>
      ) : (
        <AgencyTable>
          <thead>
            <tr>
              <th>Acronym</th>
              <th>Name</th>
              <th>Current Acting Chair</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {agencies.map((agency) => (
              <tr key={agency.acronym}>
                <td>{agency.acronym}</td>
                <td>{agency.fullName}</td>
                <td>{agency.currentChair}</td>
                <td>{agency.description}</td>
              </tr>
            ))}
          </tbody>
        </AgencyTable>
      )}
    </AgenciesPageContainer>
  );
};

export default AgenciesPage;
