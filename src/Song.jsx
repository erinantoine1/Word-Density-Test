import React, { useState, useEffect } from 'react';
import { Button, Radio, Tooltip, Input, theme, Form } from 'antd';
import { LaptopOutlined, AudioOutlined, UserOutlined } from '@ant-design/icons';
import { Howl } from 'howler';
import Timer from 'timermodule';
import downArrows from '../public/icons/downArrows.gif';
import correct from '../public/icons/smile2.svg';
import partial from '../public/icons/neutral.svg';
import incorrect from '../public/icons/frown2.svg';

const Song = (props) => {
  const [giveUpDisabled, setGiveUpDisabled] = useState(true);
  const [guessDisabled, setGuessDisabled] = useState(true);
  const [songStartedMessage, setSongStartedMessage] = useState(["Let's get started!", "Here we go!", "Let's do this!"]);
  const [partiallyCorrectMessage, setPartiallyCorrectMessage] = useState([
    `Almost there, ${props.currentGameSettings.name}! Any other guesses?`,
    `Sorta. Give it another shot, ${props.currentGameSettings.name}!`,
    `You can do it, ${props.currentGameSettings.name}! Guess again.`
  ]);
  const [onePointMessage, setOnePointMessage] = useState([
    `You were super close, ${props.currentGameSettings.name}! (+1 Pt)`,
    `Maybe next time, ${props.currentGameSettings.name}! (+1 Pt)`,
    `The next round will go better, ${props.currentGameSettings.name}! Don't stress. (+1 Pt)`
  ]);
  const [correctMessage, setCorrectMessage] = useState([
    `You got it, ${props.currentGameSettings.name}! (+2 Pts)`,
    `You're killing it, ${props.currentGameSettings.name}! (+2 Pts)`,
    `Awesome work, ${props.currentGameSettings.name}. (+2 Pts)`
  ]);
  const [bothIncorrectMessage, setBothIncorrectMessage] = useState([
    `The artist AND title are both incorrect! Try again, ${props.currentGameSettings.name}!`,
    `Nope. I don't think so, ${props.currentGameSettings.name}. Give artist and title another try!`,
    `Maybe next time, ${props.currentGameSettings.name}!`
  ]);
  const [noPointsMessage, setNoPointsMessage] = useState([
    `Eek! Maybe next round, ${props.currentGameSettings.name}! (+0 Pts)`,
    `That's too bad, ${props.currentGameSettings.name}. (+0 Pts)`,
    `Maybe next time, ${props.currentGameSettings.name}! (+0 Pts)`
  ]);

  // useEffect(()=>{
  //   if (props.currentGameSettings.name !== undefined) {
  //     props.setCurrentGameSettings.name(props.currentGameSettings.name);
  //   }
  // }, [props.currentGameSettings.name]);

  const readyUp = (e) => {
    console.log('NAME: ', props.currentGameSettings.name);
    props.setBeforeStart(false);
    props.setQuestionComplete(false);
    props.setArtistInputCorrect(false);
    props.setTitleInputCorrect(false);
    props.setArtistInputBorder('solid 2px #001528')
    props.setTitleInputBorder('solid 2px #001528')
    props.setTitleInput('');
    props.setArtistInput('');
    props.setStatusMessageImg('');
    props.setDisabledArtistInput(false);
    props.setDisabledTitleInput(false);
    props.setIsCorrectArtistImg('');
    props.setIsCorrectTitleImg('');
    setGiveUpDisabled(false);
    setGuessDisabled(false);
    props.setStatusMessage(songStartedMessage[Math.floor(Math.random() * songStartedMessage.length)]);

    if (props.currentSongNum === 1) {
      props.onActionClick();
    }
    props.currentSong.mp3.play();
    for (var i = 0; i < props.unplayedSongs.length; i++) {
      if (props.unplayedSongs[i].title === props.currentSong.title) {
        var tempUnplayedSongsArray = props.unplayedSongs.slice();
        tempUnplayedSongsArray.splice(i, 1);
        props.setUnplayedSongs(tempUnplayedSongsArray);
        var tempPlayedSongsArray = props.playedSongs.slice();
        tempPlayedSongsArray.push(props.currentSong);
        props.setPlayedSongs(tempPlayedSongsArray);
      }
    }
    e.preventDefault();
  };

  const submitGuess = (e) => {
    e.preventDefault();
    if ((props.titleInput === props.currentSong.title) && (props.artistInput !== props.currentSong.artist)) {
      props.setStatusMessageImg(partial);
      props.setTitleInputCorrect(true);
      props.setDisabledTitleInput(true);
      props.setIsCorrectTitleImg(correct);
      props.setArtistInputCorrect(false);
      props.setDisabledArtistInput(false);
      props.setIsCorrectArtistImg(incorrect);
      props.setStatusMessage(partiallyCorrectMessage[Math.floor(Math.random() * partiallyCorrectMessage.length)]);
      props.setTitleInputBorder('solid 2px #38b5ff');
      props.setArtistInputBorder('solid 2px #554cff');
    } else if ((props.titleInput !== props.currentSong.title) && (props.artistInput === props.currentSong.artist)) {
      props.setStatusMessageImg(partial);
      props.setTitleInputCorrect(false);
      props.setDisabledTitleInput(false);
      props.setIsCorrectTitleImg(incorrect);
      props.setArtistInputCorrect(true);
      props.setDisabledArtistInput(true);
      props.setIsCorrectArtistImg(correct);
      props.setTitleInputBorder('solid 2px #554cff');
      props.setArtistInputBorder('solid 2px #38b5ff');
      props.setStatusMessage(partiallyCorrectMessage[Math.floor(Math.random() * partiallyCorrectMessage.length)]);
    } else if ((props.titleInput !== props.currentSong.title) && (props.artistInput !== props.currentSong.artist)) {
      props.setStatusMessageImg(incorrect);
      props.setArtistInputCorrect(false);
      props.setDisabledArtistInput(false);
      props.setIsCorrectArtistImg(incorrect);
      props.setTitleInputCorrect(false);
      props.setDisabledTitleInput(false);
      props.setIsCorrectTitleImg(incorrect);
      props.setStatusMessage(bothIncorrectMessage[Math.floor(Math.random() * bothIncorrectMessage.length)]);
      props.setTitleInputBorder('solid 2px #554cff');
      props.setArtistInputBorder('solid 2px #554cff');
    } else if ((props.titleInput === props.currentSong.title) && (props.artistInput === props.currentSong.artist)) {
      setGiveUpDisabled(true);
      setGuessDisabled(true);
      props.setStatusMessageImg(correct);
      props.setCompletedAlbumArt(props.currentSong.albumArt);
      props.setCompletedArtist(props.currentSong.artist);
      props.setCompletedTitle(props.currentSong.title);
      props.setDisabledTitleInput(true);
      props.setDisabledArtistInput(true);
      props.setTitleInputBorder('solid 2px #38b5ff');
      props.setArtistInputBorder('solid 2px #38b5ff');
      props.setCurrentScore(props.currentScore + 2);
      props.setStatusMessage(correctMessage[Math.floor(Math.random() * correctMessage.length)]);
      props.setNumCorrect(props.numCorrect + 1);
      props.setQuestionComplete(true);
      props.currentSong.mp3.stop();
      props.setCurrentSongNum(props.currentSongNum + 1);
      props.setCurrentSong(props.unplayedSongs[Math.floor(Math.random() * props.unplayedSongs.length)]);
    }
  };

  const giveUp = (e) => {
    e.preventDefault();
    setGiveUpDisabled(true);
    setGuessDisabled(true);
    if ((props.titleInput === props.currentSong.title) && (props.artistInput !== props.currentSong.artist)) {
      props.setStatusMessageImg(partial);
      props.setCompletedTitle(props.currentSong.title);
      props.setCompletedArtist(props.currentSong.artist);
      props.setCompletedAlbumArt(props.currentSong.albumArt);
      props.setDisabledTitleInput(true);
      props.setIsCorrectTitleImg(correct);
      props.setDisabledArtistInput(false);
      props.setIsCorrectArtistImg(incorrect);
      props.setCurrentScore(props.currentScore + 1);
      props.setNumPartiallyCorrect(props.numPartiallyCorrect + 1);
      props.setStatusMessage(onePointMessage[Math.floor(Math.random() * onePointMessage.length)]);
      props.setTitleInputBorder('solid 2px #38b5ff');
      props.setArtistInputBorder('solid 2px #554cff');
      props.currentSong.mp3.stop();
      props.setQuestionComplete(true);
      props.setCurrentSongNum(props.currentSongNum + 1);
      props.setCurrentSong(props.unplayedSongs[Math.floor(Math.random() * props.unplayedSongs.length)]);
    }
    if ((props.titleInput !== props.currentSong.title) && (props.artistInput === props.currentSong.artist)) {
      props.setStatusMessageImg(partial);
      props.setCompletedTitle(props.currentSong.title);
      props.setCompletedArtist(props.currentSong.artist);
      props.setCompletedAlbumArt(props.currentSong.albumArt);
      props.setDisabledTitleInput(false);
      props.setIsCorrectTitleImg(incorrect);
      props.setDisabledArtistInput(true);
      props.setIsCorrectArtistImg(correct);
      props.setCurrentScore(props.currentScore + 1);
      props.setNumPartiallyCorrect(props.numPartiallyCorrect + 1);
      props.setStatusMessage(onePointMessage[Math.floor(Math.random() * onePointMessage.length)]);
      props.setTitleInputBorder('solid 2px #554cff');
      props.setArtistInputBorder('solid 2px #38b5ff');
      props.currentSong.mp3.stop();
      props.setQuestionComplete(true);
      props.setCurrentSongNum(props.currentSongNum + 1);
      props.setCurrentSong(props.unplayedSongs[Math.floor(Math.random() * props.unplayedSongs.length)]);
    }
    if ((props.titleInput !== props.currentSong.title) && (props.artistInput !== props.currentSong.artist)) {
      props.setCompletedTitle(props.currentSong.title);
      props.setCompletedArtist(props.currentSong.artist);
      props.setCompletedAlbumArt(props.currentSong.albumArt);
      props.setStatusMessageImg(incorrect);
      props.setDisabledArtistInput(false);
      props.setIsCorrectArtistImg(incorrect);
      props.setDisabledTitleInput(false);
      props.setIsCorrectTitleImg(incorrect);
      props.setStatusMessage(noPointsMessage[Math.floor(Math.random() * noPointsMessage.length)]);
      props.setNumIncorrect(props.numIncorrect + 1);
      props.setCurrentSongNum(props.currentSongNum + 1);
      props.setTitleInputBorder('solid 2px #554cff');
      props.setArtistInputBorder('solid 2px #554cff');
      props.currentSong.mp3.stop();
      props.setQuestionComplete(true);
      props.setCurrentSongNum(props.currentSongNum + 1);
      props.setCurrentSong(props.unplayedSongs[Math.floor(Math.random() * props.unplayedSongs.length)]);
    }
  };

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: '100%'}}>
      <div style={{height: '80.0%', width: '100%', display:'flex', flexWrap: 'wrap', justifyContent:'center', alignItems: 'center', marginLeft: '35px'}}>
        <div style={{position: 'relative', border: 'solid', height: '550px', width: '850px', backgroundColor: '#001528', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px', marginTop: '50px', marginLeft: '100px'}}>
          <div style={{position: 'relative', border: 'dashed #1776ff 3px', height: '535px', width: '835px', backgroundColor: '#001528', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px'}}>
              <div style={{position: 'relative', border: 'solid 1px #fafafa', height: '520px', width: '820px', backgroundColor: '#001528', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', borderRadius: '10px', color: '#fafafa'}}>
                <div style={props.beforeStart ? {visibility: "visible", position: 'absolute', top: '25%', color: '#fafafa', fontSize: '60px'} : {visibility: "hidden"}}>
                  Click to Start
                </div>
                <div style={props.beforeStart ? {visibility: "visible", position: 'absolute', top: '42%'} : {visibility: "hidden"}}>
                  <img src={downArrows} alt=""/><img src={downArrows} style={{marginLeft: '60px'}} alt=""/><img src={downArrows} style={{marginLeft: '60px'}} alt=""/>
                </div>
                <div style={{width: '100%', display: 'inline-flex', justifyContent: 'center', fontSize: '32px', alignItems: 'center', position: 'absolute', top: '50px'}}>
                  {props.statusMessage}
                </div>
                <div style={props.questionComplete ? {visibility: "visible", position: 'absolute', top: '24%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width:
              '70%'} : {visibility: "hidden"}}>
                  <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginTop: '3%'}}>
                    <div>
                      <img src={props.completedAlbumArt} alt="" style={{height: '150px', width: '150px', border: 'solid #fafafa 1px', borderRadius: '10px'}}/>
                    </div>
                    <div>
                      <div style={props.completedTitle ? {margin: '10px', width: '100%', display: 'flex', justifyContent: 'flex-start', marginLeft: '20px', fontSize: '28px'} : {display: 'none'}}>
                        <AudioOutlined style={{color: '#1776ff'}}/>  {props.completedTitle}
                      </div>
                      <div style={props.completedArtist ? {margin: '10px', width: '100%', display: 'flex', justifyContent: 'flex-start', marginLeft: '20px', fontSize: '28px'} : {display: 'none'}}>
                        <UserOutlined style={{color: '#1776ff'}}/>  {props.completedArtist}
                      </div>
                    </div>
                  </div>
                </div>
                <img src={props.statusMessageImg} style={props.statusMessageImg ? {marginRight: '10px', height: '250px', width: '250px', position: 'absolute', top: '350px', left: '650px'} : {visibility: 'hidden'}} alt=""/>
                <Button type="primary" style={props.beforeStart ? {visibility: "visible", height: '75px', width: '300px', fontSize: '30px', padding: '-30%', position: 'absolute', top: '55%', animation:'shake 0.82s cubic-bezier(.36, .07, .19, .97) both infinite'} : {visibility: 'hidden'}}  onClick={(e) => {readyUp(e)}}>Ready!</Button>

                <Button type="primary" style={props.questionComplete ? {visibility: "visible", height: '100px', width: '300px', fontSize: '50px', position: 'absolute', top: '350px'} : {visibility: 'hidden'}}  onClick={(e) => {readyUp(e)}}>Ready!</Button>
              </div>
            </div>
        </div>
      </div>
      <div style={{height: '30.0%', width: '23%', fontSize: '80px', marginLeft: '130px'}}>
        <Form>
          <div style={{display: 'inline-flex', width: '100%'}}>
            <Input
              size="large"
              placeholder="Song"
              prefix={<AudioOutlined />}
              style={props.titleInputCorrect ? {margin: '10px', border: `solid 2px #38b6ff`, height: '50px'} : {margin: '10px', border: `${props.titleInputBorder}`, height: '50px'}}
              value={props.titleInput}
              border="true"
              disabled={props.disabledTitleInput}
              onChange={(e) => {props.setTitleInput(e.target.value)}}
            />
          </div>
          <div style={{display: 'inline-flex', width: '100%'}}>
            <Input
              size="large"
              placeholder="Artist"
              prefix={<UserOutlined />}
              style={props.artistInputCorrect ? {margin: '10px', border: `solid 2px #38b6ff`, height: '50px'} : {margin: '10px', border: `${props.artistInputBorder}`, height: '50px'}}
              value={props.artistInput}
              border="true"
              disabled={props.disabledArtistInput}
              onChange={(e) => {props.setArtistInput(e.target.value)}}
            />
          </div>
          <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={guessDisabled}
            style={{margin: '10px', width: '170px', height: '50px', borderRadius: '5px', color: '#fafafa', border: 'none'}}
            onClick={(e) => {submitGuess(e)}}>
              Guess!
          </Button>
          <Button type="dashed" htmlType="button" disabled={giveUpDisabled} style={{marginLeft: '10px', height: '50px', width: '130px'}} onClick={(e) => {giveUp(e)}}>Give Up</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Song;