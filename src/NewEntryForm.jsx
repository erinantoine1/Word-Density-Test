import React, { useState } from 'react';
import axios from 'axios';
import { runTest } from './runTest';
import { RunTestButton, NewEntryElements } from './styles';

const NewEntryForm = (props) => {
  const [parsedText, setParsedText] = useState('');

  const handleUrlInput = (e) => {
    props.setUrlInput(e.target.value);
  };

  const handleNotesInput = (e) => {
    props.setNotesInput(e.target.value);
  };

  const handleRunTestButtonClick = () => {
    if (!props.urlInput) {
      return;
    }

    const normalizeURL = (url) => {
      url = url.trim();

      if (!/^(https?:\/\/)/i.test(url)) {
        url = 'https://' + url;
      }

      if (!url.includes('www.') && !url.startsWith('https://www.')) {
        url = url.replace(/(https:\/\/)/i, '$1www.');
      }

      return url;
    };

    var formattedURL = normalizeURL(props.urlInput);

    const newUrlObj = {
      webpage_url: formattedURL,
      notes: props.notesInput,
    };

    axios
      .post('/webpages', newUrlObj)
      .then((response) => {
        const urlId = response.data.insertedId;

        runTest(formattedURL, urlId, setParsedText, (updatedTestReport) => {
          props.setTestReport(updatedTestReport);
        });

        axios.get('/webpages')
          .then((response) => {
              props.setData(response.data);
          });
      }).catch((error) => {
        console.error('Error checking URL accessibility:', error);
      });
  };


  return (
    <div>
      {props.formVisible ? (
        <NewEntryElements>
          <input
            type='text'
            value={props.urlInput}
            placeholder='URL'
            onChange={handleUrlInput}
          />
          <input
            type='text'
            value={props.notesInput}
            placeholder='Notes (optional)'
            onChange={handleNotesInput}
          />
          <RunTestButton onClick={handleRunTestButtonClick}>Run Word Density Test</RunTestButton>
        </NewEntryElements>
      ) : null}
    </div>
  );
};

export default NewEntryForm;
