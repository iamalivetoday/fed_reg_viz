import React from 'react';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';

const FooterContainer = styled.footer`
  width: 100%;
  padding: 1rem;
  color: black;
  text-align: center;
  position: flex;
  bottom: 0;
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
      Made with <FaHeart style={{ color: 'black' }} />  by    
      <MadeleineLink href="https://whenwereachwe.net" target="_blank" rel="noopener noreferrer"> Madeleine</MadeleineLink>
    </FooterContainer>
  );
};

export default Footer;
