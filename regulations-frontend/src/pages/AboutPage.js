import React, { useState } from 'react';
import styled from 'styled-components';

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

const ContentContainer = styled.div`
  display: flex;
`;

const AboutBody = styled.div`
  font-size: 1em;
  margin-right: 5%;
  padding-right: 5%;
  flex: 1;
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  align-self: flex-start;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? '#007BFF' : '#f1f1f1')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  border: none;
  border-bottom: ${(props) => (props.active ? '2px solid #007BFF' : '2px solid #ccc')};
  outline: none;
  font-size: 1em;
  margin-bottom: 5px;

  &:hover {
    background-color: #ddd;
  }
`;

const HighlightText = styled.span`
  position: relative;
  cursor: pointer;
  &:hover::after {
    content: "${(props) => props.tooltip}";
    position: absolute;
    left: 100%;
    top: 0;
    margin-left: 10px;
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    white-space: nowrap;
    z-index: 10;
  }
  &:hover::before {
    content: '';
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 5px;
    width: 10px;
    height: 1px;
    background-color: #ccc;
  }
`;

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('simple');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <AboutPageContainer>
      <AboutTitle>About</AboutTitle>
      <ContentContainer>
        <AboutBody>
          {activeTab === 'simple' && (
            <p>
              <HighlightText tooltip="Laws created by agencies without Congress approval.">Regulations</HighlightText> are like laws but don't need to be passed by Congress. They're issued by agencies. Agencies propose regulations and ask the public for their opinions. Based on feedback, they decide whether to proceed, modify, or withdraw the regulation.
            </p>
          )}
          {activeTab === 'advanced' && (
            <div>
              <p>
                <a href="https://www.regulations.gov">regulations.gov</a> is a federal website intended to make it easier for the public to participate and impact Federal rules and regulations.
                <br /><br />
                This website is not an official website of the US government, but it uses the regulations.gov API 
                to help make that website easier to navigate.
              </p>
              <p>
                <HighlightText tooltip="Official rules that have the force of law but aren't created by Congress.">Regulations</HighlightText> are official rules that have the force of law but are not created by Congress. They are proposed by government agencies, which solicit public feedback before deciding on the final form of the regulation. This process is known as rulemaking.
                <br /><br />
                Examples of proposed regulations include AI policies, noncompete clauses, and various health and safety measures. It's important for the public to participate in this process to ensure that regulations are fair and effective.
              </p>
            </div>
          )}
        </AboutBody>
        <TabContainer>
          <TabButton active={activeTab === 'simple'} onClick={() => handleTabClick('simple')}>
            Simple Explanation
          </TabButton>
          <TabButton active={activeTab === 'advanced'} onClick={() => handleTabClick('advanced')}>
            Advanced Explanation
          </TabButton>
        </TabContainer>
      </ContentContainer>
    </AboutPageContainer>
  );
};

export default AboutPage;
