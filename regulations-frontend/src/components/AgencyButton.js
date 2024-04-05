import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: darkblue;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: none;
  }
`;

const AgencyButton = ({ agencyId, onClick }) => {
  return (
    <Button onClick={() => onClick(agencyId)}>
      {agencyId}
    </Button>
  );
};

export default AgencyButton;
