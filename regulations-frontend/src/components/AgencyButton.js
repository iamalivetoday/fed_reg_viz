import React, { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  margin: 15px;
  cursor: pointer;
  font-size: 16px;
  position: relative;
  width: 150px; // fixed width
  height: 50px; // fixed height
  white-space: normal; // allow text to wrap
  overflow-wrap: break-word; // break long words if necessary

  &:hover {
    opacity: 0.8;
    outline: 2px solid blue;
    box-shadow: 0 0 10px blue;
  }

  &:focus {
    outline: none;
  }
`;

const SmallText = styled.div`
  font-size: 12px; // smaller font size for full agency name
  line-height: 1.2;
`;

const AgencyButton = ({ agencyId, fullAgencyName, onClick }) => {
  const [displayText, setDisplayText] = useState(agencyId);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setDisplayText(fullAgencyName);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setDisplayText(agencyId);
    setIsHovered(false);
  };

  return (
    <Button
      onClick={() => onClick(agencyId)}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered ? (
        <SmallText>
          {displayText}
        </SmallText>
      ) : (
        displayText
      )}
    </Button>
  );
};

export default AgencyButton;
