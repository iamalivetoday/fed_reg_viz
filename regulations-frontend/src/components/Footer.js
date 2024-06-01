import React from 'react';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';

const FooterContainer = styled.footer`
  width: 100%;
  padding-bottom: 1rem;
  padding-right: 10rem;
  color: black;
  background: white;
  text-align: right;
  display: right;
  align-items: vertical;
`;

const MadeleineDiv = styled.div`
  padding-right: 1rem;
  justify-content:right;
`;

const MadeleineLink = styled.a`
  color: black;
  text-decoration: none;
  

  &:hover {
    color: black;
    font-style: italic;
    text-decoration: none;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div>
      </div>
      <MadeleineDiv>
      "to improve our country, state, county, town, and school"
      <br/>
      Made with  <FaHeart style={{ color: 'black' }} />   by    
      <MadeleineLink href="https://whenwereachwe.net" target="_blank" rel="noopener noreferrer"> Madeleine</MadeleineLink>
      { }
      </MadeleineDiv>
    </FooterContainer>
  );
};

export default Footer;
