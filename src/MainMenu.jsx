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
    <div style={{border: 'solid #fafafa 1px', backgroundColor: '#001528', height: '500px', width: '700px', padding: '5px', borderRadius: '10px'}}>
      <div style={{border: 'dashed #1776ff 3px', backgroundColor: '#001528', height: '488px', width: '688px', padding: '5px', borderRadius: '10px'}}>
        <div style={{backgroundColor: '#001528', height: '476px', width: '676px', paddingTop: '5px', borderRadius: '10px'}}>
          <div style={{fontSize: '75px', color: '#1776ff', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px'}}>
            Melody
          </div>
          <div style={{fontSize: '75px', color: '#1776ff', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '-13px'}}>
            Mastermind!
          </div>
          <div style={{fontSize: '75px', color: '#fafafa', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '-160px', marginLeft: '7px'}}>
            Melody
          </div>
          <div style={{fontSize: '75px', color: '#fafafa', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '-14px', marginLeft: '7px'}}>
            Mastermind!
          </div>
          <img src={correctLeftHalf} alt="" style={{position: 'absolute', top: '170px', left: '461px', height: '300px', width: '300px'}}/>

          <div style={{height: '300px', width: '300px', overflow: 'hidden'}}>
            <img src={incorrectRightHalf} alt="" style={{position: 'absolute', top: '170px', left: '15px'}}/>
          </div>
          <div style={{marginTop: '-275px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
            <img className='mainMenuButton' src={musicalNote2} alt="" style={{height: '40px', width: '40px', position: 'absolute', top: '255px', left: '185px', display: 'none'}}/>
            <Button className='mainMenuButton' type="primary" style={{width: '306px', height: '50px', fontSize: '24px', marginLeft: '-5px', marginBottom: '10px'}} onClick={(e) => {goToNewGameMenu(e)}}>New Game</Button>
            <img className='mainMenuButton' src={musicalNote2} alt="" style={{height: '40px', width: '40px', position: 'absolute', top: '260px', left: '475px', display: 'none'}}/>
          </div>
          <div style={{marginTop: '15px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginLeft: '-5px'}}>
            <img  className='mainMenuButton' src={musicalNote1} alt="" style={{height: '38px', width: '38px', position: 'absolute', top: '325px', left: '185px', display: 'none'}}/>
            <Button  className='mainMenuButton' type="dashed" style={{width: '306px', height: '50px', fontSize: '24px', color: '#001258', marginBottom: '10px'}}>How to Play</Button>
            <img  className='mainMenuButton' src={musicalNote1} alt="" style={{height: '38px', width: '38px', position: 'absolute', top: '325px', left: '475px', display: 'none'}}/>
          </div>
          <div style={{marginTop: '15px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginLeft: '-5px'}}>
            <img  className='mainMenuButton' src={musicalNote2} alt="" style={{height: '40px', width: '40px', position: 'absolute', top: '385px', left: '185px', display: 'none'}}/>
            <Button  className='mainMenuButton' type="dashed" style={{width: '306px', height: '50px', fontSize: '24px', color: '#001258'}} onClick={(e) => {goToLeaderboard(e)}}>Leaderboard</Button>
            <img  className='mainMenuButton' src={musicalNote2} alt="" style={{height: '40px', width: '40px', position: 'absolute', top: '385px', left: '475px', display: 'none'}}/>
          </div>
        </div>
        </div>
      </div>
  );
};

export default MainMenu;