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
    <div style={{border: 'solid #fafafa 1px', backgroundColor: '#001528', height: '500px', width: '700px', padding: '5px', borderRadius: '10px'}}>
      <div style={{border: 'dashed #1776ff 3px', height: '488px', width: '688px', padding: '5px', borderRadius: '10px'}}>
        <div style={{display: 'inline-flex', justifyContent: 'space-between', width: '100%', padding: '10px'}}>
            <Button style={{fontSize: '40px', backgroundColor: '#001528', borderRadius: '50%', height: '40px', width: '40px'}} onClick={(e) => {goToMainMenu(e)}}><LeftCircleOutlined style={{fontSize: '40px', color: '#fafafa', borderRadius: '50%', height: '40px', width: '40px', marginLeft: '-15px', marginTop: '-5px'}}/></Button>
            <Tooltip title="How to Play" placement='right' color='red' key='red'>
              <InfoCircleOutlined style={{fontSize: '40px', color: '#fafafa'}}/>
            </Tooltip>
          </div>
        <div style={{height: '476px', width: '676px', borderRadius: '10px', marginTop: '-10px'}}>
          <div style={{ fontSize: '60px', color: '#fafafa', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginLeft: '-10', marginTop: '-55px', color: '#1776ff'}}>Settings</div>
          <img src={correctLeftHalf} alt="" style={{position: 'absolute', top: '170px', left: '461px', height: '300px', width: '300px'}}/>

          <div style={{height: '300px', width: '300px', overflow: 'hidden'}}>
            <img src={incorrectRightHalf} alt="" style={{position: 'absolute', top: '170px', left: '15px'}}/>
          </div>
          <div style={{marginTop: '-285px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', color: '#fafafa', marginLeft: '-5px'}}>
            <form>
            <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', backgroundColor: '#001528', width: '306px', padding: '2px', paddingTop: '9px',borderRadius: '10px', border: 'solid #fafafa 2px', fontSize: '14px', marginBottom: '20px'}}>
            <span style={{position: 'absolute', top: '95px', left: '210px', backgroundColor: '#001528', paddingLeft: '4px', paddingRight: '4px', color: '#fafafa'}}>Name</span>
        <Input type='text' showCount maxLength={20} size="large" value={nameInput} style={{width: '300px', height: '40px', fontSize: '22px', color: '#001528'}} border="true" onChange={(e) => {setNameInput(e.target.value)}}/>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', backgroundColor: '#001528', width: '306px', padding: '2px', paddingTop: '9px', borderRadius: '10px', border: 'solid #fafafa 2px', fontSize: '14px', marginBottom: '15px', marginTop: '15px'}}>
        <span style={{position: 'absolute', top: '170px', left: '210px', backgroundColor: '#001528', paddingLeft: '4px', paddingRight: '4px'}}>Genre</span>
         <Radio.Group value={genreInput} onChange={(e) => {setGenreInput(e.target.value)}} style={{border: '1px solid #fafafa', borderRadius: '7px', width: '306px', color: '#001528'}}>
           <Radio.Button value="Random" style={{fontSize: '22px', width: '33.3%', height: '40px', paddingTop: '3px', paddingLeft: '10px'}}>Random</Radio.Button>
           <Radio.Button value="Pop" style={{fontSize: '22px', width: '33.3%', height: '40px', paddingTop: '3px', paddingLeft: '28px'}}>Pop</Radio.Button>
           <Radio.Button value="Alt/Rock" style={{fontSize: '22px', width: '33.3%', height: '40px', paddingTop: '3px', paddingLeft: '10px'}}>Alt/Rock</Radio.Button>
         </Radio.Group>
       </div>
          <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', backgroundColor: '#001528', width: '306px', padding: '2px', paddingTop: '9px',borderRadius: '10px', border: 'solid #fafafa 2px', fontSize: '14px', marginTop: '20px'}}>
          <span style={{position: 'absolute', top: '248px', left: '210px', backgroundColor: '#001528', paddingLeft: '4px', paddingRight: '4px'}}>Difficulty</span>
           <Radio.Group value={difficultyInput} onChange={(e) => {setDifficultyInput(e.target.value)}} style={{border: '1px solid #fafafa', borderRadius: '7px', justifyContent: 'center', width: '303px', color: '#001528'}}>
           <Radio.Button value="Easy"  style={{fontSize: '22px', height: '40px', width: '33.3%', paddingTop: '3px', paddingLeft: '23px'}}>Easy</Radio.Button>
           <Radio.Button value="Medium" style={{fontSize: '22px', width: '33.3%', height: '40px', paddingTop: '3px', paddingLeft: '10px'}}>Medium</Radio.Button>
           <Radio.Button value="Hard" style={{fontSize: '22px', width: '33.3%', height: '40px', paddingTop: '3px', paddingLeft: '23px'}}>Hard</Radio.Button>
         </Radio.Group>
       </div>

       <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', backgroundColor: '#001528', width: '306px', borderRadius: '10px', border: 'solid #fafafa 2px', fontSize: '14px', marginTop: '20px', fontSize: '14px', padding: '2px', paddingTop: '9px'}}>
       <span style={{position: 'absolute', top: '325px', left: '210px', backgroundColor: '#001528', paddingLeft: '4px', paddingRight: '4px'}}># of Songs</span>
         <Radio.Group value={songNumInput} onChange={(e) => {setSongNumInput(e.target.value)}} style={{border: '1px solid #fafafa', borderRadius: '7px', width: '303px', color: '#001528'}}>
           <Radio.Button value="10" style={{fontSize: '22px', height: '40px', paddingTop: '3px', width: '33.3%', paddingLeft: '33px'}}>10</Radio.Button>
           <Radio.Button value="20" style={{fontSize: '22px', height: '40px', paddingTop: '3px', width: '33.3%', paddingLeft: '33px'}}>20</Radio.Button>
           <Radio.Button value="30" style={{fontSize: '22px', height: '40px', paddingTop: '3px', width: '33.3%', paddingLeft: '33px'}}>30</Radio.Button>
         </Radio.Group>
       </div>
       <div style={{position: 'absolute', marginTop: '20px'}}>
         <Button type="primary" onClick={(e) => {submitCurrentSettings(e)}} style={{width: '306px', height: '50px', fontSize: '22px'}} >Start Game!</Button>
       </div>
            </form>
          </div>
        </div>
        </div>
      </div>
  );
};

export default NewGameMenu;