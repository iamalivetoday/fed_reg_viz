import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const agencies = [
  { acronym: "FTC", fullName: "Federal Trade Commission", description: "Protects consumers and promotes competition" },
  { acronym: "NRC", fullName: "Nuclear Regulatory Commission", description: "Regulates nuclear power plants and materials" },
  { acronym: "FDA", fullName: "Food and Drug Administration", description: "Ensures safety of food and drugs" },
  { acronym: "FCC", fullName: "Federal Communications Commission", description: "Regulates radio, TV, wire, satellite, and cable communications" },
  { acronym: "FAA", fullName: "Federal Aviation Administration", description: "Regulates civil aviation" },
  { acronym: "SSA", fullName: "Social Security Administration", description: "Manages social security" },
  { acronym: "FDIC", fullName: "Federal Deposit Insurance Corporation", description: "Insures deposits in banks" },
  { acronym: "EPA", fullName: "Environmental Protection Agency", description: "Protects human health and the environment" },
  { acronym: "BIS", fullName: "Bureau of Industry and Security", description: "Promotes export control and security" },
  { acronym: "OSH", fullName: "Occupational Safety and Health Administration", description: "Ensures safe and healthful working conditions" },
  { acronym: "CDC", fullName: "Centers for Disease Control and Prevention", description: "Protects public health and safety" },
  { acronym: "CMM", fullName: "Centers for Medicare and Medicaid", description: "Administers Medicare and Medicaid" },
  { acronym: "DOC", fullName: "Department of Commerce", description: "Promotes economic growth" },
  { acronym: "DOA", fullName: "Department of Agriculture", description: "Develops and executes farming policies" },
  { acronym: "DOE", fullName: "Department of Education", description: "Oversees federal education policies" },
  { acronym: "DOI", fullName: "Department of the Interior", description: "Manages public lands and resources" },
  { acronym: "DOL", fullName: "Department of Labor", description: "Improves working conditions" },
  { acronym: "DOD", fullName: "Department of Defense", description: "Provides military forces" },
  { acronym: "DOT", fullName: "Department of Transportation", description: "Oversees federal transportation projects" },
  { acronym: "DHS", fullName: "Department of Homeland Security", description: "Ensures national security" },
  { acronym: "HUD", fullName: "Department of Housing and Urban Development", description: "Develops housing policies" },
  { acronym: "VA", fullName: "Department of Veteran's Affairs", description: "Provides veterans' benefits" },
  { acronym: "DOJ", fullName: "Department of State", description: "Handles foreign affairs" },
  { acronym: "HHS", fullName: "Department of Health and Human Services", description: "Protects health of all Americans" },
  { acronym: "NSF", fullName: "National Parks Service", description: "Manages national parks" },
  { acronym: "IRS", fullName: "Internal Revenue Services", description: "Collects federal taxes" },
  { acronym: "NSF", fullName: "National Science Foundation", description: "Promotes scientific research" },
  { acronym: "NASA", fullName: "National Aeronautics and Space Administration", description: "Explores space" },
  { acronym: "USA", fullName: "Army", description: "Provides land-based military operations" },
  { acronym: "USN", fullName: "Navy", description: "Conducts naval operations" },
  { acronym: "USCG", fullName: "Coast Guard", description: "Provides maritime security" },
  { acronym: "USAF", fullName: "Air Force", description: "Conducts aerial operations" },
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

const AgencyTable = styled.table`
  width: 85%;
  margin-top: 10px;
  border-collapse: collapse;
  border: 0.4px solid black; /* Change the border color to black */
  th, td {
    border: 1px solid black; /* Change the border color to black */
    padding: 8px;
    text-align: left;
  }
  th {
    color: black;
  }

`;
const AgencyRow = styled.tr`
  &:hover {
    td:nth-child(1), td:nth-child(2) {
      font-style: italic;
    }
  }
`;

const AgenciesPage = () => {
  const navigate = useNavigate();

  const handleAgencyClick = (agencyAcronym) => {
    console.log("heyyyyy")
    navigate(`/dockets/${agencyAcronym}`);
  };

  return (
    <AgenciesPageContainer>
      <Header>
        <Title>some of our beautiful federal agencies</Title>
      </Header>
      <AgencyTable>
        <tbody>
          {agencies.map((agency) => (
            <AgencyRow key={agency.acronym} onClick={() => handleAgencyClick(agency.acronym)}>
              <td>{agency.acronym}</td>
              <td>{agency.fullName}</td>
              <td>{agency.description}</td>
            </AgencyRow>
          ))}
        </tbody>
      </AgencyTable>
    </AgenciesPageContainer>
  );
};

export default AgenciesPage;
