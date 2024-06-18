import React from 'react';
import styled from 'styled-components';
import FAQCard from '../components/FAQCard';

const FAQs = [
  {
    question: 'What is the return policy?',
    answer: 'You can return any item within 30 days of purchase.'
  },
  {
    question: 'How do I track my order?',
    answer: 'You can track your order using the tracking number provided in the shipping confirmation email.'
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we offer international shipping to most countries.'
  }
];

const AboutPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* ensure it takes the full height */
  margin-top: 2%;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 2%;
`;

const AboutTitle = styled.div`
  font-size: 3em;
  display: inline-block;
`;

const AboutBody = styled.a`
  font-size: 1em;
  margin-right: 5%;
  padding-right: 5%;

`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  justify-items: center;
  padding-left: 10%;
  padding-right: 10%;
`;
const AboutPage = () => {
  return (
    <AboutPageContainer>
      <AboutTitle>
        About
      </AboutTitle>
      <AboutBody>
        <a href="https://www.regulations.gov">regulations.gov</a> is a federal website intended to make it easier for the public to participate and impact Federal rules and regulations.
        <br/> <br/>
        This website is not an official website of the US government, but it uses the regulations.gov API 
        to help make that website easier to navigate.
      </AboutBody>
      <GridContainer>
        {FAQs.map((faq, index) => (
          <FAQCard key={index} question={faq.question} answer={faq.answer} />
        ))}
      </GridContainer>
    </AboutPageContainer>
  );
};

export default AboutPage;

/*
FAQ
what are regulations? 
Regulations are like laws, but they don't need to be passed by Congress.
Instead, they're issued by agencies.
Agencies submit their proposed regulations to the public, and people leave comments on whether they think the proposed regulation is a good or bad idea.
Depending on what the people think, agencies will either proceed with the rulemaking process, issue a new or modified proposal, or withdraw the proposal.

Some examples of proposed regulations: 
You can see why it's important for people to participate in the rulemaking process by 
AI, noncompetes, 

How to use this websites
You can use this website to look through our proposed federal regulations and see what people think about them, and post comments.
*/


/*
“Federal agency” means any department, independent establishment, Government corporation, or other agency of the executive branch of the Federal Government, including the United States Postal Service, but shall not include the American National Red Cross.
*/