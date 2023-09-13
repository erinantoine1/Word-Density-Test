import React, { useState } from 'react';
import { LightGreyButton } from './styles';

const NewEntryButton = (props) => {
  const handleButtonClick = () => {
    props.setFormVisible(!props.formVisible);
    props.setUrlInput('');
    props.setNotesInput('');
  };

  return (
    <LightGreyButton onClick={handleButtonClick}>Add New URL</LightGreyButton>
  );
};

export default NewEntryButton;
