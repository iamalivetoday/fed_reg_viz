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
  padding: 10px 16px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? '#0A3161' : '#f1f1f1')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  border: none;
  border-bottom: ${(props) => (props.active ? '2px solid #0A3161' : '2px solid #ccc')};
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
      <AboutTitle>about</AboutTitle>
      <ContentContainer>
        <AboutBody>
          {activeTab === 'simple' && (
            <p>
              Federal regulations are laws created by federal agencies. <br/><br/>Agencies propose regulations and ask the public for their opinions. Based on feedback, they decide whether to proceed, modify, or withdraw the regulation.
            </p>
          )}
          {activeTab === 'advanced' && (
            <div>
              <p>
                <a href="https://www.regulations.gov">Regulations.gov</a> is a federal website intended to make it easier for the public to participate and impact Federal rules and regulations.
                <br /><br />
                Until 2003, if you wanted to comment on a proposed rule or regulation, you needed to know the sponsoring agency and when the proposed rule or regulation would be published. You then had to visit to the agency’s physical location and review the documentation in a reading room, and then adhere to the comment process specific to each agency. <br/>
                <br/> 
                <a href="https://www.regulations.gov">Regulations.gov</a>, launched in January 2003, removed some of the logistical barriers that made it difficult for a citizen to participate in the complex regulatory process. The website made it possible for people to comment and review Federal rules and regulations.
                <br/><br/>
                <i><HighlightText tooltip="americanpublic.space">This</HighlightText></i> website is not an official website of the US government, but it uses the regulations.gov API to display the information on <i><HighlightText tooltip="regulations.gov">that</HighlightText></i> website more clearly.
              </p>
            </div>
          )}
        </AboutBody>
        <TabContainer>
          <TabButton active={activeTab === 'simple'} onClick={() => handleTabClick('simple')}>
            less
          </TabButton>
          <TabButton active={activeTab === 'advanced'} onClick={() => handleTabClick('advanced')}>
            more
          </TabButton>
        </TabContainer>
      </ContentContainer>
    </AboutPageContainer>
  );
};

export default AboutPage;
