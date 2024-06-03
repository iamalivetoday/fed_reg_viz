import React from 'react';
import AgencyButton from '../components/AgencyButton'; // Adjust the path as needed
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';

const agencies = [
  { acronym: "EPA", fullName: "Environmental Protection Agency" },
  { acronym: "FDA", fullName: "Food and Drug Administration" },
  { acronym: "FTC", fullName: "Federal Trade Commission" },
  { acronym: "FAA", fullName: "Federal Aviation Administration" },
  { acronym: "BIS", fullName: "Bureau of Industry and Security" },
  { acronym: "OSH", fullName: "Occupational Safety and Health Administration" },
  { acronym: "CDC", fullName: "Centers for Disease Control and Prevention" },
  { acronym: "DOC", fullName: "Department of Commerce" },
  { acronym: "DOA", fullName: "Department of Agriculture" },
  { acronym: "DOD", fullName: "Department of Defense" },
  { acronym: "DOT", fullName: "Department of Transportation" },
  { acronym: "DHS", fullName: "Department of Homeland Security" },
  { acronym: "HUD", fullName: "Department of Housing and Urban Development" },
  { acronym: "VA", fullName: "Department of Veteran's Affairs" },
  { acronym: "DOJ", fullName: "Department of State" },
  { acronym: "HHS", fullName: "Department of Health and Human Services" },
  { acronym: "NSF", fullName: "National Science Foundation" },
  { acronym: "NASA", fullName: "National Aeronautics and Space Administration" },
  { acronym: "SSA", fullName: "Social Security Administration" },

];

const AgenciesPageContainer = styled.div`
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.h1`
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 2.5em;
`;

const StyledAgencyButton = styled(AgencyButton)`
  margin: 10px;
  padding: 20px; // Increase padding for larger button
  font-size: 1.2em; // Larger text
`;

const AgencyTable = styled.table`
  width: 80%;
  margin-top: 20px;
  border-collapse: collapse;
  border: 1px solid white;
  th, td {
    border: 1px solid white;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #282C34;
  }
`;

const AgenciesPage = () => {
  const navigate = useNavigate();

  const handleAgencyClick = (agencyAcronym) => {
    navigate(`/dockets/${agencyAcronym}`);
  };

  return (
    <AgenciesPageContainer>
      <Title>Some of our beautiful federal agencies</Title>
      {agencies.map((agency) => (
        <StyledAgencyButton 
          key={agency.acronym} 
          agencyId={agency.acronym} 
          fullAgencyName={agency.fullName}
          onClick={() => handleAgencyClick(agency.acronym)}
        />
      ))}
      <AgencyTable>
        <thead>
          <tr>
            <th>Acronym</th>
            <th>Name</th>
            <th>Current Acting Chair</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {agencies.map((agency) => (
            <tr key={agency.acronym}>
              <td>{agency.acronym}</td>
              <td>{agency.fullName}</td>
              <td>{/* Future Chair Data */}</td>
              <td>{/* Future Purpose Data */}</td>
            </tr>
          ))}
        </tbody>
      </AgencyTable>
    </AgenciesPageContainer>
  );
};

export default AgenciesPage;