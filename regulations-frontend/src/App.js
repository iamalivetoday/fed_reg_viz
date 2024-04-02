// App.js or a similar parent component
import React from 'react';
import AllComments from './components/AllComments';
import DocketSummary from './components/DocketSummary';

const App = () => {
  const comments = [
    { id: 1, color: 'green', commenter: { firstName: 'John', lastName: 'Doe' }, text: 'Great job!' },
    { id: 2, color: 'yellow', commenter: { firstName: 'Jane', lastName: 'Doe' }, text: 'Interesting read...' },
    // Add more comments as needed
  ];

  return (
    <div>
      <DocketSummary docketId="FTC-2024-0018" />

      <AllComments comments={comments} bgColor="lightblue" />
    </div>
  );
};

export default App;
