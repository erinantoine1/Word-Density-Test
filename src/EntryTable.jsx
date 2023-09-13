import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Paper } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { calculateWordDensity } from './wordDensityCalculator';
import { runTest } from './runTest';
import { styled } from '@mui/system';
import { CustomTableContainer, CustomUrlCell, CustomColumnHeaderCell, RunTestButton, FullHistoryButton, MostRecentHistoryButton, CustomResultTableContainer, CustomResultsContainer, CustomTooltip } from './styles';

function EntryTable( props ) {
  const [parsedText, setParsedText] = useState('');
  const [fullHistory, setFullHistory] = useState([]);
  const [mostRecentHistory, setMostRecentHistory] = useState([]);

  function formatDate(dateStr) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  }

  const handleRunTest = (webpageUrl, rowId) => {
    runTest(webpageUrl, rowId, setParsedText, (updatedTestReport) => {
      props.setTestReport(updatedTestReport);
    });
  };

  const handleFullHistoryButtonClick = (rowId) => {
    axios
      .get(`tests/${rowId}`)
      .then((response) => {
        props.setTestReport(response.data);
      })
      .catch((error) => {
        console.error('Error fetching full history:', error);
      });
  };

  const handleRecentHistoryButtonClick = (rowId) => {
    axios
      .get(`tests/${rowId}/recent`)
      .then((response) => {
        props.setTestReport(response.data);
      })
      .catch((error) => {
        console.error('Error fetching most recent history:', error);
      });
  };

  return (
    <CustomTableContainer component={Paper}>
      <CustomResultsContainer>
        <TableHead>
          <TableRow>
            <CustomColumnHeaderCell>URL</CustomColumnHeaderCell>
            <CustomColumnHeaderCell>Run Test</CustomColumnHeaderCell>
            <CustomColumnHeaderCell>Test History</CustomColumnHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow key={row.id}>
              <CustomUrlCell>
                <Tooltip
                  title={
                    <CustomTooltip>
                      ID: {row.id}<br />
                      Notes: {row.notes}<br />
                      Date Added: {formatDate(row.date_added)}<br />
                      Date Updated: {formatDate(row.date_updated)}
                    </CustomTooltip>
                  }
                >
                  <span>{row.webpage_url}</span>
                </Tooltip>
              </CustomUrlCell>
              <TableCell>
                <RunTestButton onClick={() => handleRunTest(row.webpage_url, row.id)}>Run Test</RunTestButton>
              </TableCell>
              <TableCell>
                <FullHistoryButton onClick={() => handleFullHistoryButtonClick(row.id)}>Full</FullHistoryButton>
                <MostRecentHistoryButton onClick={() => handleRecentHistoryButtonClick(row.id)}>Most Recent</MostRecentHistoryButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </CustomResultsContainer>
    </CustomTableContainer>
  );
}

export default EntryTable;
