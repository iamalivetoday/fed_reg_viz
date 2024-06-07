import React from 'react';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';

const FooterContainer = styled.footer`
  width: 100%;
  padding-right: 10rem;
  padding-bottom: 10px;
  color: black;
  background: white;
  text-align: right;
  display: right;
  align-items: vertical;
  position: fixed;
  left:0;
  bottom:0;
  font-size: 0.5rem;
  right:0;
`;

const MadeleineDiv = styled.div`
  padding-right: 1rem;
  justify-content:right;
`;

const MadeleineLink = styled.a`
  color: black;
  text-decoration: none;  
  padding-top: 15px;
  padding-bottom: 15px;

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
        <MadeleineLink href="https://youtu.be/CGHGDO_b_q0?si=UDEsnEyzxhD-fm20&t=90" target="_blank" rel="noopener noreferrer"> "to improve our country, state, county, town, and school..." </MadeleineLink>
        <br/>
        Made with  <FaHeart style={{ color: 'black' }} />   by    
        <MadeleineLink href="https://whenwereachwe.net" target="_blank" rel="noopener noreferrer"> Madeleine</MadeleineLink>
        { }
      </MadeleineDiv>
    </FooterContainer>
  );
};

export default Footer;
