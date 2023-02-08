import React, { useState } from 'react';
import {
  InfoCircleOutlined, LeftCircleOutlined
} from '@ant-design/icons';
import { Button, Radio, Tooltip, Input, Slider } from 'antd';
import whiteFlower1 from '../public/icons/whiteFlower1.svg';
import whiteFlower2 from '../public/icons/whiteFlower2.svg';
import whiteFlower3 from '../public/icons/whiteFlower3.svg';
import correct from '../public/icons/smile2.svg';
import partial from '../public/icons/neutral.svg';
import incorrect from '../public/icons/frown2.svg';
import correctLeftHalf from '../public/icons/correctLeftHalf.svg';
import incorrectRightHalf from '../public/icons/incorrectRightHalf.svg';
import musicalNote1 from '../public/icons/musicalNote1.svg';
import musicalNote2 from '../public/icons/musicalNote2.svg';


const NewGameMenu = (props) => {
  const [nameInput, setNameInput] = useState('');
  const [difficultyInput, setDifficultyInput] = useState('Easy');
  const [genreInput, setGenreInput] = useState('Random');
  const [songNumInput, setSongNumInput] = useState('10');

  const submitCurrentSettings = (e) => {
    props.setCurrentGameSettings({
      name: nameInput,
      difficulty: difficultyInput,
      genre: genreInput,
      songNum: songNumInput
    });
    props.setNewGameMenuVisible(false);
    props.setInGame(true);

    e.preventDefault();
  };

  const goToMainMenu = (e) => {
    props.setNewGameMenuVisible(false);
    props.setMainMenuVisible(true);
  }

  return (
    <div style={{backgroundColor: '#001528', height: '867px', width: '1157px', padding: '5px', borderRadius: '10px', border: '1px solid #fafafa'}}>
    <div style={{border: 'dashed #1776ff 3px', height: '855px', width: '1145px', padding: '5px', borderRadius: '10px'}}>
    <div style={{display: 'inline-flex', justifyContent: 'space-between', width: '100%', padding: '10px'}}>
          <Button style={{fontSize: '40px', backgroundColor: '#001528', borderRadius: '50%', height: '50px', width: '50px'}} onClick={(e) => {goToMainMenu(e)}}>
            <LeftCircleOutlined style={{fontSize: '50px', color: '#fafafa', borderRadius: '50%', height: '50px', width: '50px', marginLeft: '-15px', marginTop: '-5px'}}/>
          </Button>
          <Tooltip title="How to Play" placement='right' color='red' key='red'>
            <InfoCircleOutlined style={{fontSize: '50px', color: '#fafafa'}}/>
          </Tooltip>
        </div>
      <div style={{height: '476px', width: '676px', paddingTop: '5px', borderRadius: '10px', marginTop: '-145px'}}>
        <div style={{fontSize: '125px', color: '#1776ff', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '85px', marginLeft: '435px'}}>
          Settings
        </div>
        {/* <div style={{fontSize: '125px', color: '#fafafa', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginLeft: '460px', marginTop: '-143px'}}>
          Settings
        </div> */}
        <img src={correctLeftHalf} alt="" style={{position: 'absolute', top: '325px', left: '768px', height: '500px', width: '500px'}}/>
        <div style={{height: '500px', width: '250px'}}>
          <img src={incorrectRightHalf} alt="" style={{position: 'absolute', top: '325px', height: '500px', width: '250px'}}/>
        </div>
          <div style={{marginTop: '-200px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', color: '#fafafa', marginLeft: '-5px'}}>
            <form>
            <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', width: '400px', paddingTop: '9px',borderRadius: '10px', border: 'solid #fafafa 2px', fontSize: '14px', marginLeft: '250px', height: '75px', marginLeft: '450px', marginTop: '-250px'}}>
            <span style={{position: 'absolute', top: '195px', left: '375px', paddingLeft: '4px', paddingRight: '4px', color: '#fafafa', fontSize: '24px'}}>Name:</span>
        <Input type='text' showCount maxLength={20} value={nameInput} style={{width: '392px', height: '68px', fontSize: '24px', color: '#001528', marginTop: '-9px'}} border="true" onChange={(e) => {setNameInput(e.target.value)}}/>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', width: '400px', padding: '2px', paddingTop: '9px', borderRadius: '10px', border: 'solid #fafafa 2px', fontSize: '14px', marginBottom: '25px', marginTop: '35px', marginLeft: '450px', height: '75px'}}>
        <span style={{position: 'absolute', top: '305px', left: '375px', paddingLeft: '4px', paddingRight: '4px', fontSize: '24px', marginBottom: '5px'}}># of Songs:</span>
         <Radio.Group value={songNumInput} onChange={(e) => {setSongNumInput(e.target.value)}} style={{border: '1px solid #fafafa', borderRadius: '7px', width: '400px', color: '#001528', marginTop: '-7px'}}>
          <Radio.Button value="10" style={{fontSize: '28px', height: '65px', paddingTop: '15px', width: '33.3%', paddingLeft: '45px'}}>10</Radio.Button>
           <Radio.Button value="20" style={{fontSize: '28px', height: '65px', paddingTop: '15px', width: '33.3%', paddingLeft: '45px'}}>20</Radio.Button>
           <Radio.Button value="30" style={{fontSize: '28px', height: '65px', paddingTop: '15px', width: '33.3%', paddingLeft: '45px'}}>30</Radio.Button>
         </Radio.Group>
       </div>
       <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', width: '400px', padding: '2px', paddingTop: '9px', borderRadius: '10px', border: 'solid #fafafa 2px', fontSize: '14px', marginBottom: '15px', marginTop: '35px', marginLeft: '450px', height: '75px'}}>
        <span style={{position: 'absolute', top: '415px', left: '375px', paddingLeft: '4px', paddingRight: '4px', fontSize: '24px'}}>Difficulty:</span>
         <Radio.Group value={difficultyInput} onChange={(e) => {setDifficultyInput(e.target.value)}} style={{border: '1px solid #fafafa', borderRadius: '7px', width: '400px', color: '#001528', marginTop: '-7px'}}>
          <Radio.Button value="Easy"  style={{fontSize: '28px', height: '65px', width: '33.3%', paddingTop: '15px', paddingLeft: '35px'}}>Easy</Radio.Button>
           <Radio.Button value="Medium" style={{fontSize: '28px', width: '33.3%', height: '65px', paddingTop: '15px', paddingLeft: '15px'}}>Medium</Radio.Button>
           <Radio.Button value="Hard" style={{fontSize: '28px', width: '33.3%', height: '65px', paddingTop: '15px', paddingLeft: '35px'}}>Hard</Radio.Button>
         </Radio.Group>
       </div>
      <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', width: '400px', padding: '2px', paddingTop: '9px', borderRadius: '10px', border: 'solid #fafafa 2px', fontSize: '14px', marginBottom: '15px', marginTop: '35px', marginLeft: '450px', height: '75px'}}>
        <span style={{position: 'absolute', top: '525px', left: '375', paddingLeft: '4px', paddingRight: '4px', fontSize: '24px'}}>Genre:</span>
         <Radio.Group value={genreInput} onChange={(e) => {setGenreInput(e.target.value)}} style={{border: '1px solid #fafafa', borderRadius: '7px', width: '400px', color: '#001528', marginTop: '-7px'}}>
           <Radio.Button value="Random" style={{fontSize: '28px', width: '33.3%', height: '65px', paddingTop: '14px', paddingLeft: '14px'}}>Random</Radio.Button>
           <Radio.Button value="Pop" style={{fontSize: '28px', width: '33.3%', height: '65px', paddingTop: '14px', paddingLeft: '40px'}}>Pop</Radio.Button>
           <Radio.Button value="Alt/Rock" style={{fontSize: '28px', width: '33.3%', height: '65px', paddingTop: '14px', paddingLeft: '14px'}}>Alt/Rock</Radio.Button>
         </Radio.Group>
       </div>
       <div style={{position: 'absolute', marginTop: '75px'}}>
         <Button type="primary" onClick={(e) => {submitCurrentSettings(e)}} style={{width: '400px', height: '75px', fontSize: '28px', marginLeft: '450px'}} >Start Game!</Button>
       </div>
            </form>
          </div>
        </div>
        </div>
      </div>
  );
};

export default NewGameMenu;