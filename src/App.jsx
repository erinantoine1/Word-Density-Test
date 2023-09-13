import React, { useState } from 'react';
import NewEntry from './NewEntry.jsx';
import AllEntries from './AllEntries.jsx';
import TestReport from './TestReport.jsx';
import { PageItemsContainer, CustomPageTitle } from './styles';


const App = (props) => {
  const [data, setData] = useState([]);
  const [testReport, setTestReport] = useState([]);

  return (
    <PageItemsContainer>
      <NewEntry data={data} setData={setData} testReport={testReport} setTestReport={setTestReport}/>
      <AllEntries data={data} setData={setData} testReport={testReport} setTestReport={setTestReport}/>
      <TestReport testReport={testReport} setTestReport={setTestReport}/>
    </PageItemsContainer>
  );
};

export default App;