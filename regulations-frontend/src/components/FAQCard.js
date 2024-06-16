import React, { useState } from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  perspective: 1000px;
  margin: 10px;
`;

const Card = styled.div`
  width: 200px; // 2/3 of the previous width
  height: 133px; // 2/3 of the previous height
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: ${props => (props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
`;

const CardFront = styled(CardFace)`
  background-color: #fff;
`;

const CardBack = styled(CardFace)`
  background-color: #f1f1f1;
  transform: rotateY(180deg);
`;

const FAQCard = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <CardContainer onClick={handleCardClick}>
      <Card isFlipped={isFlipped}>
        <CardFront>{question}</CardFront>
        <CardBack>{answer}</CardBack>
      </Card>
    </CardContainer>
  );
};

export default FAQCard;
