import React from 'react';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';

const FooterContainer = styled.footer`
  width: 100%;
  padding: 1rem;
  color: white;
  background: #13151C; /* Dark background color */
  text-align: center;
  position: flex;
  bottom: 0;
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
      Made with  <FaHeart style={{ color: 'white' }} />   by    
      <MadeleineLink href="https://whenwereachwe.net" target="_blank" rel="noopener noreferrer"> Madeleine</MadeleineLink>
    </FooterContainer>
  );
};

export default Footer;
