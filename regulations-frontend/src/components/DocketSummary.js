import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const SummaryContainer = styled.div`
  width: 93%;
  border: 1px solid #333;
  padding: 10px;
  margin: 20px auto;
  word-wrap: break-word;
`;

const Subheading = styled.h2`
  font-size: 1.5em;
  color: #333;
  margin-bottom: 10px;
  margin-top: 0px;
  padding-top: 0px;
`;

const Text = styled.p`
  font-size: 1em;
  color: #555;
`;

const SmallText = styled.p`
  font-size: 0.8em;
  color: #777;
`;

const agencyNames = [
  { acronym: "ACL", fullName: "Administration for Community Living" },
  { acronym: "ACF", fullName: "Administration of Children and Families" },
  { acronym: "AOA", fullName: "Administration on Aging" },
  { acronym: "AHRQ", fullName: "Agency for Healthcare Research and Quality" },
  { acronym: "ATSDR", fullName: "Agency for Toxic Substances and Disease Registry" },
  { acronym: "AMS", fullName: "Agricultural Marketing Service" },
  { acronym: "ARS", fullName: "Agricultural Research Service" },
  { acronym: "AFD", fullName: "Air Force Department" },
  { acronym: "TTB", fullName: "Alcohol and Tobacco Tax and Trade Bureau" },
  { acronym: "ATF", fullName: "Alcohol, Tobacco, Firearms, and Explosives Bureau" },
  { acronym: "APHIS", fullName: "Animal and Plant Health Inspection Service" },
  { acronym: "AD", fullName: "Antitrust Division" },
  { acronym: "ASC", fullName: "Appraisal Subcommittee" },
  { acronym: "ATBCB", fullName: "Architectural and Transportation Barriers Compliance Board" },
  { acronym: "AD", fullName: "Army Department" },
  { acronym: "BPA", fullName: "Bonneville Power Administration" },
  { acronym: "BEA", fullName: "Bureau of Economic Analysis" },
  { acronym: "BIA", fullName: "Bureau of Indian Affairs" },
  { acronym: "BIS", fullName: "Bureau of Industry and Security" },
  { acronym: "BLS", fullName: "Bureau of Labor Statistics" },
  { acronym: "BLM", fullName: "Bureau of Land Management" },
  { acronym: "BOEM", fullName: "Bureau of Ocean Energy Management" },
  { acronym: "BPD", fullName: "Bureau of Public Debt" },
  { acronym: "BOR", fullName: "Bureau of Reclamation" },
  { acronym: "BSEE", fullName: "Bureau of Safety and Environmental Enforcement" },
  { acronym: "Census", fullName: "Bureau of the Census" },
  { acronym: "BSC", fullName: "Business Standards Council" },
  { acronym: "CDC", fullName: "Centers for Disease Control and Prevention" },
  { acronym: "CMS", fullName: "Centers for Medicare & Medicaid Services" },
  { acronym: "CSHIB", fullName: "Chemical Safety and Hazard Investigation Board" },
  { acronym: "CSEO", fullName: "Child Support Enforcement Office" },
  { acronym: "USCG", fullName: "Coast Guard" },
  { acronym: "CFPB", fullName: "Consumer Financial Protection Bureau" },
  { acronym: "CPSC", fullName: "Consumer Product Safety Commission" },
  { acronym: "CNCS", fullName: "Corporation for National and Community Service" },
  { acronym: "CEQ", fullName: "Council on Environmental Quality" },
  { acronym: "CBP", fullName: "Customs and Border Protection Bureau" },
  { acronym: "CISA", fullName: "Cybersecurity and Infrastructure Security Agency" },
  { acronym: "DARS", fullName: "Defense Acquisition Regulations System" },
  { acronym: "USDA", fullName: "Department of Agriculture" },
  { acronym: "DOC", fullName: "Department of Commerce" },
  { acronym: "DOD", fullName: "Department of Defense" },
  { acronym: "ED", fullName: "Department of Education" },
  { acronym: "DOE", fullName: "Department of Energy" },
  { acronym: "HHS", fullName: "Department of Health and Human Services" },
  { acronym: "DHS", fullName: "Department of Homeland Security" },
  { acronym: "HUD", fullName: "Department of Housing and Urban Development" },
  { acronym: "DOJ", fullName: "Department of Justice" },
  { acronym: "DOL", fullName: "Department of Labor" },
  { acronym: "DOI", fullName: "Department of the Interior" },
  { acronym: "Treasury", fullName: "Department of the Treasury" },
  { acronym: "DOT", fullName: "Department of Transportation" },
  { acronym: "VA", fullName: "Department of Veterans Affairs" },
  { acronym: "DEA", fullName: "Drug Enforcement Administration" },
  { acronym: "EAC", fullName: "Election Assistance Commission" },
  { acronym: "EBSA", fullName: "Employee Benefits Security Administration" },
  { acronym: "ETA", fullName: "Employment and Training Administration" },
  { acronym: "EPA", fullName: "Environmental Protection Agency" },
  { acronym: "EEOC", fullName: "Equal Employment Opportunity Commission" },
  { acronym: "EOIR", fullName: "Executive Office for Immigration Review" },
  { acronym: "EXIM", fullName: "Export Import Bank of the United States" },
  { acronym: "FAR", fullName: "Federal Acquisition Regulation" },
  { acronym: "FAA", fullName: "Federal Aviation Administration" },
  { acronym: "FBI", fullName: "Federal Bureau of Investigation" },
  { acronym: "FEMA", fullName: "Federal Emergency Management Agency" },
  { acronym: "FHWA", fullName: "Federal Highway Administration" },
  { acronym: "FMCSA", fullName: "Federal Motor Carrier Safety Administration" },
  { acronym: "BOP", fullName: "Federal Prisons Bureau" },
  { acronym: "FRA", fullName: "Federal Railroad Administration" },
  { acronym: "FRTIB", fullName: "Federal Retirement Thrift Investment Board" },
  { acronym: "FTC", fullName: "Federal Trade Commission" },
  { acronym: "FWS", fullName: "Fish and Wildlife Service" },
  { acronym: "FTA", fullName: "Federal Transit Administration" },
  { acronym: "FinCEN", fullName: "Financial Crimes Enforcement Network" },
  { acronym: "FSOC", fullName: "Financial Stability Oversight Council" },
  { acronym: "FWS", fullName: "Fish and Wildlife Service" },
  { acronym: "FDA", fullName: "Food and Drug Administration" },
  { acronym: "FNS", fullName: "Food and Nutrition Service" },
  { acronym: "FSIS", fullName: "Food Safety and Inspection Service" },
  { acronym: "FAS", fullName: "Foreign Agricultural Service" },
  { acronym: "FS", fullName: "Forest Service" },
  { acronym: "GSA", fullName: "General Services Administration" },
  { acronym: "HRSA", fullName: "Health Resources and Services Administration" },
  { acronym: "ICE", fullName: "Immigration and Customs Enforcement Bureau" },
  { acronym: "IHS", fullName: "Indian Health Service" },
  { acronym: "IRS", fullName: "Internal Revenue Service" },
  { acronym: "ITA", fullName: "International Trade Administration" },
  { acronym: "MSHA", fullName: "Mine Safety and Health Administration" },
  { acronym: "NASA", fullName: "National Aeronautics and Space Administration" },
  { acronym: "NARA", fullName: "National Archives and Records Administration" },
  { acronym: "NCUA", fullName: "National Credit Union Administration" },
  { acronym: "NHTSA", fullName: "National Highway Traffic Safety Administration" },
  { acronym: "NIST", fullName: "National Institute of Standards and Technology" },
  { acronym: "NIH", fullName: "National Institutes of Health" },
  { acronym: "NLRB", fullName: "National Labor Relations Board" },
  { acronym: "NOAA", fullName: "National Oceanic and Atmospheric Administration" },
  { acronym: "NSF", fullName: "National Science Foundation" },
  { acronym: "NTSB", fullName: "National Transportation Safety Board" },
  { acronym: "OPM", fullName: "Office of Personnel Management" },
  { acronym: "PBGC", fullName: "Pension Benefit Guaranty Corporation" },
  { acronym: "PHMSA", fullName: "Pipeline and Hazardous Materials Safety Administration" },
  { acronym: "SBA", fullName: "Small Business Administration" },
  { acronym: "SSA", fullName: "Social Security Administration" },
  { acronym: "TSA", fullName: "Transportation Security Administration" },
  { acronym: "USAID", fullName: "U.S. Agency for International Development" }
];

function DocketSummary({ docketId }) {
  const [summary, setSummary] = useState('');
  const [docketTitle, setDocketTitle] = useState('');
  const [docketAgency, setDocketAgency] = useState('');

  useEffect(() => {
    if (!docketId || docketId === '<docket_id>') {
      console.error('Invalid or missing docketId prop:', docketId);
      return;
    }

    axios.get(`http://127.0.0.1:5000/api/docket_abstract/${docketId}`)
      .then(response => {
        const abstract = response.data.abstract || '';
        const cleanedAbstract = abstract.replace(
          'To see the Request for Information and submit a comment, please click on “Browse Documents.”', 
          ''
        );
        setSummary(cleanedAbstract.trim());
      })
      .catch(err => {
        console.error('Oh nooo fetching abstract!', err);
      });
  }, [docketId]);

  useEffect(() => {
    if (!docketId || docketId === '<docket_id>') {
      console.error('Invalid or missing docketId prop:', docketId);
      return;
    }

    const fetchDocketTitle = async () => {
      try {
        console.log(`Fetching title for docketId: ${docketId}`); // ✅ Debugging
        const response = await axios.get(`http://127.0.0.1:5000/api/title/${docketId}`);
        console.log('API Response:', response.data); // ✅ Debugging response
        setDocketTitle(response.data.title || 'Title not found');
        const agencyId = response.data.agency || 'Unknown Agency';
        const agency = agencyNames.find(entry => entry.acronym === agencyId);
        const agencyFullName = agency ? agency.fullName : agencyId || "Unknown Agency";
        setDocketAgency(agencyFullName);
      } catch (err) {
        console.error('Oh nooo fetching title!', err.response?.data?.error || err.message);
      }
    };

    fetchDocketTitle();
  }, [docketId]);

  return (
    <SummaryContainer>
      <Text>{docketAgency || 'Loading agency...'}</Text>
      <Subheading>{docketTitle || 'Loading title...'}</Subheading>
      <SmallText>
        Docket ID:{" "}
        <a 
          href={`https://www.regulations.gov/docket/${docketId}`} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit", fontStyle: "normal" }}
          onMouseOver={(e) => e.target.style.fontStyle = "italic"}
          onMouseOut={(e) => e.target.style.fontStyle = "normal"}
        >
          {docketId}
        </a>
      </SmallText>

      <p>{summary === null ? 'No abstract found' : summary || 'Loading docket summary...'}</p>
    </SummaryContainer>
  );
}

export default DocketSummary;
