import React, { useState } from 'react';
import { Button, Radio, Tooltip } from 'antd';
import axios from 'axios';
import correct from '../public/icons/smile2.svg';
import partial from '../public/icons/neutral.svg';
import incorrect from '../public/icons/frown2.svg';
import correctLeftHalf from '../public/icons/correctLeftHalf.svg';
import incorrectRightHalf from '../public/icons/incorrectRightHalf.svg';

const GameOver = (props) => {

  const goToMainMenu = (e) => {
    e.preventDefault();
    props.setMainMenuVisible(true);
    props.setGameOver(false);
    props.setQuestionComplete(false);
    props.setTitleInput('');
    props.setArtistInput('');
    props.setTitleInputBorder('solid 2px #001528');
    props.setArtistInputBorder('solid 2px #001528');
    props.setTitleInputCorrect(false);
    props.setArtistInputCorrect(false);
    props.setDisabledTitleInput(false);
    props.setDisabledArtistInput(false);
    props.setIsCorrectTitleImg('');
    props.setIsCorrectArtistImg('');
    props.setBeforeStart(true);
    props.setAvgTime(0);
    props.setTimer({
        "mytimer" : {
          "time" : {
            mm : "00",
            ss : "00"
          },
          status : "INIT"
        }}
    )};

  return (
    <div style={{border: 'solid #fafafa 1px', backgroundColor: '#001528', height: '500px', width: '700px', padding: '5px', borderRadius: '10px'}}>
      <div style={{border: 'dashed #1776ff 3px', backgroundColor: '#001528', height: '488px', width: '688px', padding: '5px', borderRadius: '10px'}}>
        <div style={{backgroundColor: '#001528', height: '476px', width: '676px', paddingTop: '5px', borderRadius: '10px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', color: '#fafafa', width: '100%'}}>
      <div style={{fontSize: '60px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', color: '#1776ff'}}>
        Game Over
      </div>
      <div style={{fontSize: '22px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', marginTop: '-10px', marginBottom: '-10px'}}>
        {props.currentGameSettings.difficulty} | {props.currentGameSettings.genre} | {props.currentGameSettings.songNum} Songs
      </div>
      <div style={{display: 'inline-flex', marginTop: '0px'}}>
      <div style={{fontSize: '60px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', marginRight: '-200px'}}>
        <div style={{color: '#1776ff', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', marginBottom: '-15px'}}>
          {props.finalTime}
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', fontSize: '22px', marginBottom: '18px'}}>
          Avg: 30s
        </div>
        <div style={{width: '100%'}}>
          <div style={{height: '0px', width: '160px', border: '#1776ff 2px dashed', marginLeft: '190px', marginTop: '-8px'}}></div>
        </div>
      <div style={{display: 'inline-flex', alignItems: 'center', marginLeft: '40px', marginTop: '-15px'}}>
        <div>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', fontSize: '22px', marginTop: '10px'}}>
          Your
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', fontSize: '22px', marginRight: '30px'}}>
          Score:
        </div>
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', fontSize: '60px', color: '#fafafa', marginRight: '50px' , marginTop: '5px'}}>
        {props.currentScore} <div style={{color: '#fafafa', fontSize: '22px', display: 'inline-flex', alignItems: 'flex-end', marginBottom: '8px', marginLeft: '5px'}}>Pts</div>
      </div>
      </div>
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginRight: '115px', marginBottom: '0px'}} >
        <div style={{display: 'flex', flexWrap: 'wrap', fontSize: '60px', width: '60%', marginBottom: '-15px'}}>
          <img src={correct} alt="" style={{marginRight: '5px'}}/>
          {props.numCorrect}
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', fontSize: '60px', width: '60%', marginBottom: '-15px'}}>
          <img src={partial} alt="" style={{marginRight: '5px'}}/>
          {props.numPartiallyCorrect}
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', fontSize: '60px', width: '60%', marginBottom: '-5px'}}>
          <img src={incorrect} alt="" style={{marginRight: '5px'}}/>
          {props.numIncorrect}
        </div>
      </div>
      </div>


      <div style={{fontSize: '22px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', marginTop: '10px', marginLeft: '3px'}}>
        <Button style={{width: '306px', height: '50px', fontSize: '22px'}}
          onClick={(e) => {
            props.addToDb(e)
          }}
          type="dashed">
            Leaderboard
        </Button>
      </div>
      <div style={{fontSize: '22px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', marginBottom: '10px'}}>
        <Button style={{width: '306px', height: '50px', fontSize: '22px'}}
          type="primary"
          onClick={(e) => {goToMainMenu(e)}}>
            Main Menu
        </Button>
      </div>
      <img src={correctLeftHalf} alt="" style={{position: 'absolute', top: '170px', left: '461px', height: '300px', width: '300px'}}/>
      <img src={incorrectRightHalf} alt="" style={{position: 'absolute', top: '170px', left: '15px'}}/>
    </div>
    </div>
    </div>
  );
};

export default GameOver;