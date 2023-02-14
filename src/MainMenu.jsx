import React, { useState } from 'react';
import { Button, Radio, Tooltip } from 'antd';
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

const MainMenu = (props) => {

  const goToNewGameMenu = (e) => {
    e.preventDefault();
    props.setMainMenuVisible(false);
    props.setNewGameMenuVisible(true);
  };

  const goToLeaderboard = (e) => {
    e.preventDefault();
    props.setMainMenuVisible(false);
    props.setLeaderboardVisible(true);
  };

  return (
    <div style={{backgroundColor: '#001528', height: '867px', width: '1157px', padding: '5px', borderRadius: '10px', border: '1px solid #fafafa'}}>
      <div style={{border: 'dashed #1776ff 3px', height: '855px', width: '1145px', padding: '5px', borderRadius: '10px'}}>
        <div style={{backgroundColor: '#001528', height: '476px', width: '676px', paddingTop: '5px', borderRadius: '10px'}}>
          <div style={{fontSize: '125px', color: '#1776ff', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '65px', marginLeft: '450px'}}>
            Melody
          </div>
          <div style={{fontSize: '125px', color: '#1776ff', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '-13px', marginLeft: '450px'}}>
            Mastermind!
          </div>
          <div style={{fontSize: '125px', color: '#fafafa', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginLeft: '460px', marginTop: '-278px'}}>
            Melody
          </div>
          <div style={{fontSize: '125px', color: '#fafafa', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginLeft: '460px', marginTop: '-13px'}}>
            Mastermind!
          </div>
            <img src={correctLeftHalf} alt="" style={{position: 'absolute', top: '325px', left: '768px', height: '500px', width: '500px'}}/>
          <div style={{height: '500px', width: '250px'}}>
            <img src={incorrectRightHalf} alt="" style={{position: 'absolute', top: '325px', height: '500px', width: '250px'}}/>
          </div>
          <div style={{marginTop: '-425px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginRight: '-100px'}}>
            <Button className='mainMenuButton' type="primary" style={{width: '400px', height: '75px', fontSize: '28px', marginLeft: '350px', marginBottom: '15px'}} onClick={(e) => {goToNewGameMenu(e)}}>New Game</Button>
          </div>
          <div style={{marginTop: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginRight: '-100px'}}>
            <Button  className='mainMenuButton' type="dashed" style={{width: '400px', height: '75px', fontSize: '28px', color: '#001258', marginLeft: '350px', marginBottom: '15px'}}onClick={(e) => {props.showTutorial(e)}}>How to Play</Button>
          </div>
          <div style={{marginTop: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginLeft: '-5px', marginRight: '-100px'}}>
            <Button  className='mainMenuButton' type="dashed" style={{width: '400px', height: '75px', fontSize: '28px', marginLeft: '350px', color: '#001258'}} onClick={(e) => {goToLeaderboard(e)}}>Leaderboard</Button>
          </div>
        </div>
        </div>
      </div>
  );
};

export default MainMenu;