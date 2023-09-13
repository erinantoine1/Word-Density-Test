import React, { useState } from 'react';
import NewEntryButton from './NewEntryButton.jsx';
import NewEntryForm from './NewEntryForm.jsx';
import { NewEntryContainer } from './styles';

const NewEntry = (props) => {
  const [formVisible, setFormVisible] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [notesInput, setNotesInput] = useState('');

  return (
    <NewEntryContainer>
      <NewEntryButton
        formVisible={formVisible}
        setFormVisible={setFormVisible}
        setUrlInput={setUrlInput}
        setNotesInput={setNotesInput}
      />
      <NewEntryForm
        formVisible={formVisible}
        urlInput={urlInput}
        setUrlInput={setUrlInput}
        notesInput={notesInput}
        setNotesInput={setNotesInput}
        data={props.data}
        setData={props.setData}
        testReport={props.testReport}
        setTestReport={props.setTestReport}
      />
    </NewEntryContainer>
  );
};

export default NewEntry;
