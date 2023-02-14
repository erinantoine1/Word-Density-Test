import React, { useState } from 'react';
import { Button, Radio, Tooltip } from 'antd';
import axios from 'axios';
import correct from '../public/icons/smile2.svg';
import partial from '../public/icons/neutral.svg';
import incorrect from '../public/icons/frown2.svg';
import correctLeftHalf from '../public/icons/correctLeftHalf.svg';
import incorrectRightHalf from '../public/icons/incorrectRightHalf.svg';
import { LaptopOutlined, AudioOutlined, UserOutlined } from '@ant-design/icons';
import music from '../public/icons/musicalNote2.svg';
import {Tag} from 'antd';
import blackNote from '../public/icons/blackNote.svg';

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
    props.setAvgTime({});
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
    <div style={{backgroundColor: '#001528', height: '867px', width: '1157px', padding: '5px', borderRadius: '10px', border: '1px solid #fafafa', color: '#fafafa'}}>
    <div style={{border: 'dashed #1776ff 3px', height: '855px', width: '1145px', padding: '5px', borderRadius: '10px'}}>
        <div style={{fontSize: '125px', color: '#1776ff', width: '100%', display: 'flex', justifyContent: 'center'}}>
          Game Over
        </div>
          <img src={correctLeftHalf} alt="" style={{position: 'absolute', top: '325px', left: '768px', height: '500px', width: '500px'}}/>
        <div style={{height: '500px', width: '250px'}}>
          <img src={incorrectRightHalf} alt="" style={{position: 'absolute', top: '325px', height: '500px', width: '250px'}}/>
        </div>
                  <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginTop: '-485px'}}>
                    <div>
                      <img src={props.completedAlbumArt} alt="" style={{height: '175px', width: '175px', border: 'solid #fafafa 1px', borderRadius: '10px'}}/>
                    </div>
                    <div>
                      <div style={props.completedTitle ? {margin: '10px', width: '100%', display: 'flex', justifyContent: 'flex-start', marginLeft: '20px', fontSize: '24px'} : {display: 'none'}}>
                        <AudioOutlined style={{color: '#1776ff', marginRight: '15px'}}/>  {props.completedTitle}
                      </div>
                      <div style={props.completedArtist ? {margin: '10px', width: '100%', display: 'flex', justifyContent: 'flex-start', marginLeft: '20px', fontSize: '24px'} : {display: 'none'}}>
                        <UserOutlined style={{color: '#1776ff', marginRight: '15px'}}/>  {props.completedArtist}
                      </div>
                    </div>
                  </div>
      <div style={props.currentGameSettings.difficulty === "Easy" ? {display: 'inline-flex', marginTop: '30px', marginLeft: '225px'} : {display: 'none'}}>
      <div style={{fontSize: '60px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginRight: '-25px'}}>
        <div style={{color: '#1776ff', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '-10px', marginRight: '-70px', marginLeft: '0px', marginTop: '0px'}}>
          {props.finalTime.string}
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', fontSize: '24px', marginBottom: '20px', width: '100%', paddingLeft: '80px'}}>
          Avg: {props.avgTime.string}
        </div>
        <div style={{position: 'absolute', top: '510px', left: '385px'}}>
          <Tag color="#38b6ff" style={{ color: '#001528', fontSize: '14px'}}><b>{props.currentGameSettings.songNum}<img src={blackNote}style={{height: '10px', width: '10px'}}/></b></Tag>
          <Tag color="#1776ff" style={{ color: '#001528', fontSize: '14px', marginTop: '5px'}}><b>{props.currentGameSettings.difficulty}</b></Tag>
          <Tag color="#554cff" style={{ color: '#001528', fontSize: '14px', marginTop: '5px'}}><b>{props.currentGameSettings.genre}</b></Tag>
        </div>
        {/* </div>
        </div> */}

      <div style={{display: 'inline-flex', alignItems: 'center', marginLeft: '20px', marginTop: '-15px'}}>
        <div>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', fontSize: '24px', marginTop: '10px'}}>
          Your
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', fontSize: '24px'}}>
          Score:
        </div>
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', fontSize: '60px', color: '#fafafa', marginLeft: '15px', marginTop: '10px', marginRight: '-65px'}}>
        {props.currentScore}
      <div style={{color: '#fafafa', fontSize: '24px', display: 'inline-flex', alignItems: 'flex-end', marginBottom: '8px', marginLeft: '5px'}}>Pts</div>
      </div>
      </div>
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginLeft: '-70px', alignItems: 'center'}} >
        <div style={{display: 'flex', flexWrap: 'wrap', fontSize: '60px', width: '60%', marginBottom: '5px', alignItems: 'center'}}>
          <img src={correct} alt="" style={{marginRight: '10px', height: '75px', width:' 75px'}}/>
          {props.numCorrect}
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', fontSize: '60px', width: '60%', marginBottom: '5px', alignItems: 'center'}}>
          <img src={partial} alt="" style={{marginRight: '10px', height: '75px', width:' 75px'}}/>
          {props.numPartiallyCorrect}
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', fontSize: '60px', width: '60%', marginBottom: '5px', alignItems: 'center'}}>
          <img src={incorrect} alt="" style={{marginRight: '10px', height: '75px', width:' 75px'}}/>
          {props.numIncorrect}
        </div>
      </div>
      </div>

      <div style={props.currentGameSettings.difficulty === "Medium" ? {display: 'inline-flex', marginTop: '30px', marginLeft: '250px'} : {display: 'none'}}>
      <div style={{fontSize: '60px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginRight: '-25px'}}>
        <div style={{color: '#1776ff', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '-10px', marginRight: '-70px', marginLeft: '0px', marginTop: '0px'}}>
          {props.finalTime.string}
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', fontSize: '24px', marginBottom: '20px', width: '100%', paddingLeft: '80px'}}>
          Avg: {props.avgTime.string}
        </div>
        <div style={{position: 'absolute', top: '475px', left: '400px'}}>
          <Tag color="#38b6ff" style={{ color: '#001528', fontSize: '14px'}}><b>{props.currentGameSettings.songNum}<img src={blackNote}style={{height: '10px', width: '10px'}}/></b></Tag>
          <Tag color="#1776ff" style={{ color: '#001528', fontSize: '14px', marginTop: '5px'}}><b>{props.currentGameSettings.difficulty}</b></Tag>
          <Tag color="#554cff" style={{ color: '#001528', fontSize: '14px', marginTop: '5px'}}><b>{props.currentGameSettings.genre}</b></Tag>
        </div>
        {/* </div>
        </div> */}

      <div style={{display: 'inline-flex', alignItems: 'center', marginLeft: '20px', marginTop: '0px'}}>
        <div>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', fontSize: '24px', marginTop: '10px'}}>
          Your
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', fontSize: '24px'}}>
          Score:
        </div>
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', fontSize: '60px', color: '#fafafa', marginLeft: '15px', marginTop: '10px', marginRight: '-65px'}}>
        {props.currentScore}
      <div style={{color: '#fafafa', fontSize: '24px', display: 'inline-flex', alignItems: 'flex-end', marginBottom: '8px', marginLeft: '5px'}}>Pts</div>
      </div>
      </div>
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginLeft: '-70px', alignItems: 'center'}} >
        <div style={{display: 'flex', flexWrap: 'wrap', fontSize: '60px', width: '60%', marginBottom: '10px', alignItems: 'center'}}>
          <img src={correct} alt="" style={{marginRight: '10px', height: '75px', width:' 75px'}}/>
          {props.numCorrect}
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', fontSize: '60px', width: '60%', marginBottom: '5px', alignItems: 'center'}}>
          <img src={incorrect} alt="" style={{marginRight: '10px', height: '75px', width:' 75px'}}/>
          {props.numIncorrect}
        </div>
      </div>
      </div>

      <div style={props.currentGameSettings.difficulty === "Hard" ? {display: 'inline-flex', marginTop: '30px', marginLeft: '225px'} : {display: 'none'}}>
      <div style={{fontSize: '60px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        <div style={{color: '#1776ff', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '-10px', marginTop: '0px', marginLeft: '125px'}}>
          {props.finalTime.string}
        </div>
        <div style={props.lives > 0 ? {display: 'flex', flexWrap: 'wrap', justifyContent: 'center', fontSize: '24px', marginTop: '-5px', marginLeft: '75px'} : {display: 'none'}}>
          Avg: {props.avgTime.string}
        </div>
        <div style={props.lives > 0 ? {position: 'absolute', top: '478px', left: '415px'} : {position: 'absolute', top: '460px', left: '390px'}}>
          <Tag color="#38b6ff" style={{ color: '#001528', fontSize: '14px'}}><b>{props.currentGameSettings.songNum}<img src={blackNote}style={{height: '10px', width: '10px'}}/></b></Tag>
          <Tag color="#1776ff" style={{ color: '#001528', fontSize: '14px', marginTop: '5px'}}><b>{props.currentGameSettings.difficulty}</b></Tag>
          <Tag color="#554cff" style={{ color: '#001528', fontSize: '14px', marginTop: '5px'}}><b>{props.currentGameSettings.genre}</b></Tag>
        </div>
        {/* </div>
        </div> */}

      <div style={props.lives > 0 ? {display: 'inline-flex', alignItems: 'center', marginLeft: '-150px', marginTop: '30px'} : {display: 'inline-flex', alignItems: 'center', marginLeft: '-160px', marginTop: '100px'}}>
        <div>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', fontSize: '24px', marginTop: '10px'}}>
          Your
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', fontSize: '24px'}}>
          Score:
        </div>
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', fontSize: '60px', color: '#fafafa', marginLeft: '15px', marginTop: '10px', marginRight: '-65px'}}>
        {props.currentScore}
      <div style={{color: '#fafafa', fontSize: '24px', display: 'inline-flex', alignItems: 'flex-end', marginBottom: '8px', marginLeft: '5px'}}>Pts</div>
      </div>
      </div>
      </div>
      <div style={props.lives > 0 ? {display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginLeft: '-75px', alignItems: 'center'} : {display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginLeft: '50px', alignItems: 'center'}} >
        <div style={{display: 'flex', flexWrap: 'wrap', fontSize: '60px', width: '60%', marginBottom: '40px', alignItems: 'center'}}>
          <img src={correct} alt="" style={{marginRight: '10px', height: '75px', width:' 75px'}}/>
          {props.numCorrect}
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', fontSize: '60px', width: '60%', marginBottom: '5px', alignItems: 'center'}}>
          <img src={incorrect} alt="" style={{marginRight: '10px', height: '75px', width:' 75px'}}/>
          {props.numIncorrect}
        </div>
      </div>
      </div>



      <div style={{fontSize: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%'}}>
        <Button style={{width: '400px', height: '75px', fontSize: '28px', marginTop: '30px'}}
          onClick={(e) => {
            props.goToLeaderboard(e)
          }}
          type="dashed">
            Leaderboard
        </Button>
      </div>
      <div style={{fontSize: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%', marginTop: '30px'}}>
        <Button style={{width: '400px', height: '75px', fontSize: '28px'}}
          type="primary"
          onClick={(e) => {goToMainMenu(e)}}>
            Main Menu
        </Button>
      </div>
    </div>
    </div>
  );
};

export default GameOver;