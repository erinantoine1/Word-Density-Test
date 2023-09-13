import React, { useState, useEffect } from 'react';
import EntryTable from './EntryTable.jsx';
import axios from 'axios';

const AllEntries = (props) => {
  useEffect(() => {
    axios.get('/webpages')
      .then((response) => {
        props.setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <EntryTable data={props.data} testReport={props.testReport} setTestReport={props.setTestReport}/>
    </div>
  );
};

export default AllEntries;
