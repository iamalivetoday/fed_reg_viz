import React from 'react';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';

const FooterContainer = styled.footer`
  width: 100%;
  padding-bottom: 1rem;
  padding-right: 10rem;
  color: white;
  background: #13151C;
  text-align: right;
  padding-top: 40px;
  display: right;
  bottom: 0;
  align-items: vertical;
`;

const MadeleineDiv = styled.div`
  padding-right: 1rem;
  justify-content:right;
`;

const MadeleineLink = styled.a`
  color: white;
  text-decoration: none;
  

  &:hover {
    color: white;
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
      Made with  <FaHeart style={{ color: 'white' }} />   by    
      <MadeleineLink href="https://whenwereachwe.net" target="_blank" rel="noopener noreferrer"> Madeleine</MadeleineLink>
      { }
      </MadeleineDiv>
    </FooterContainer>
  );
};

export default Footer;
