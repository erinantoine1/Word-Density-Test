import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { CustomResultTableContainer, CustomResultsContainer, CustomColumnHeaderCell } from './styles';

const TestReport = (props) => {
  const [urlData, setUrlData] = useState({});

  function formatDate(dateStr) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  }

  useEffect(() => {
    const fetchUrls = async () => {
      const urls = {};
      for (const test of props.testReport) {
        try {
          const response = await axios.get(`webpages/${test.url_id}`);
          urls[test.url_id] = response.data[0].webpage_url;
        } catch (error) {
          console.error('Error fetching url:', error);
        }
      }
      setUrlData(urls);
    };
    fetchUrls();
  }, [props.testReport]);

  if (props.testReport.length === 0) {
    return null;
  }

  return (
    <CustomResultsContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <CustomColumnHeaderCell>Test Results</CustomColumnHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.testReport.map((test) => (
            <TableRow key={test.id}>
              <TableCell>
                <div>Test Id: {test.id}</div>
                <div>URL: {urlData[test.url_id]}</div>
                <div>Date of Test: {formatDate(test.date_of_test)}</div>
                <div>Highest-Density Words: {test.word_density_list.join(', ')}</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CustomResultsContainer>
  );
};

export default TestReport;
