import React from 'react';
import AgencyButton from '../components/AgencyButton'; // Adjust the path as needed
import {useNavigate} from 'react-router-dom';

const agencies = [
  { acronym: "EPA", fullName: "Environmental Protection Agency" },
  { acronym: "FDA", fullName: "Food and Drug Administration" },
  { acronym: "FTC", fullName: "Federal Trade Commission" },
  { acronym: "FAA", fullName: "Federal Aviation Administration" },
  { acronym: "BIS", fullName: "Bureau of Industry and Security" },
  { acronym: "OSH", fullName: "Occupational Safety and Health Administration" },
  { acronym: "CDC", fullName: "Centers for Disease Control and Prevention" },
  { acronym: "DOJ", fullName: "Department of Justice" },
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

const AgenciesPage = () => {
  const navigate = useNavigate();

  const handleAgencyClick = (agencyAcronym) => {
    navigate(`/api/dockets/agency/${agencyAcronym}`);
  };

  return (
    <div>
      Agencies Page Content
      <div>
        {agencies.map((agency) => (
          <AgencyButton 
            key={agency.acronym} 
            agencyId={agency.acronym} 
            fullAgencyName={agency.fullName}
            onClick={() => handleAgencyClick(agency.acronym)}
          />
        ))}
      </div>
    </div>
  );
};

export default AgenciesPage;
