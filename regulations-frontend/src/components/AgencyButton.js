import React from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button`
  background-color: darkblue;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  font-size: 16px;
  position: relative; // Add this for tooltip positioning

  &:hover {
    opacity: 0.8;
    outline: 2px solid gold; // Gold outline on hover
    box-shadow: 0 0 10px gold; // Gold shadow on hover
  }

  &:focus {
    outline: none;
  }
`;

// Added Tooltip for full name display
const Tooltip = styled.div`
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;

  ${Button}:hover & {
    visibility: visible;
  }
`;

const AgencyButton = ({ agencyId, fullAgencyName, onClick }) => {
  return (
    <Button onClick={() => onClick(agencyId)}>
      {agencyId}
      <Tooltip>{fullAgencyName}</Tooltip>
    </Button>
  );
};

export default AgencyButton;
