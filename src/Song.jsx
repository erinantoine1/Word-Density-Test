import React, { useState, useEffect, useRef } from 'react';
import { Button, Radio, Tooltip, Input, theme, Form, Tour } from 'antd';
import { LaptopOutlined, AudioOutlined, UserOutlined } from '@ant-design/icons';
import { Howl } from 'howler';
import Timer from 'timermodule';
import downArrows from '../public/icons/downArrows.gif';
import correct from '../public/icons/smile2.svg';
import partial from '../public/icons/neutral.svg';
import incorrect from '../public/icons/frown2.svg';
import { songsArray, popSongsArray, rockSongsArray } from './songBank.js'

const Song = (props) => {
  const [giveUpDisabled, setGiveUpDisabled] = useState(true);
  const [guessDisabled, setGuessDisabled] = useState(true);
  const [songStartedMessage, setSongStartedMessage] = useState(["Let's get started!", "Here we go!", "Let's do this!"]);
  const [partiallyCorrectMessage, setPartiallyCorrectMessage] = useState([
    `Almost there! Other guesses?`,
    `Sorta. Give it another shot!`,
    `You can do it! Guess again.`
  ]);
  const [onePointMessage, setOnePointMessage] = useState([
    `You were super close! (+1 Pt)`,
    `Maybe next time! (+1 Pt)`,
    `Don't stress yet! (+1 Pt)`
  ]);
  const [correctMessage, setCorrectMessage] = useState([
    `You got it! (+2 Pts)`,
    `You're killing it! (+2 Pts)`,
    `Awesome work. (+2 Pts)`
  ]);
  const [bothIncorrectMessage, setBothIncorrectMessage] = useState([
    `Both are incorrect!`,
    `Nope. I don't think so!`,
    `Maybe next time!`
  ]);
  const [noPointsMessage, setNoPointsMessage] = useState([
    `Maybe next round! (+0 Pts)`,
    `That's too bad. (+0 Pts)`,
    `Maybe next time! (+0 Pts)`
  ]);

  // useEffect(() => {
  //   if (props.currentSongNum === 1) {
  //     if (props.currentGameSettings.genre === 'Random') {
  //       props.setSongArray(songsArray);
  //       props.setUnplayedSongs(songsArray.slice());
  //       props.setCurrentSong(songsArray.slice()[Math.floor(Math.random() * songsArray.slice().length)]);
  //     }
  //     if (props.currentGameSettings.genre === 'Pop') {
  //       props.setSongArray(popSongsArray);
  //       props.setUnplayedSongs(popSongsArray.slice());
  //       props.setCurrentSong(popSongsArray.slice()[Math.floor(Math.random() * popSongsArray.slice().length)]);

  //     }
  //     if (props.currentGameSettings.genre === 'Alt/Rock') {
  //       props.setSongArray(rockSongsArray);
  //       props.setUnplayedSongs(rockSongsArray.slice());
  //       props.setCurrentSong(rockSongsArray.slice()[Math.floor(Math.random() * rockSongsArray.slice().length)]);

  //     }
  //   }
  // }, [props.currentSongNum])

  const readyUp = (e) => {
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
    var regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    var inputTitle = props.titleInput.replace(regex, '').toLowerCase();
    var songTitle = props.currentSong.title.replace(regex, '').toLowerCase();
    var inputArtist = props.artistInput.replace(regex, '').toLowerCase();
    var songArtist = props.currentSong.artist.replace(regex, '').toLowerCase();

    e.preventDefault();
    if ((inputTitle === songTitle) && (inputArtist !== songArtist)) {
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
    } else if ((inputTitle !== songTitle) && (inputArtist === songArtist)) {
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
    } else if ((inputTitle !== songTitle) && (inputArtist !== songArtist)) {
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
    } else if ((inputTitle === songTitle) && (inputArtist === songArtist)) {
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

    var regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    var inputTitle = props.titleInput.replace(regex, '').toLowerCase();
    var songTitle = props.currentSong.title.replace(regex, '').toLowerCase();
    var inputArtist = props.artistInput.replace(regex, '').toLowerCase();
    var songArtist = props.currentSong.artist.replace(regex, '').toLowerCase();

    e.preventDefault();
    setGiveUpDisabled(true);
    setGuessDisabled(true);

    if (props.currentGameSettings.difficulty === "Medium") {
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
    } else if (props.currentGameSettings.difficulty === "Hard") {
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
      props.setLives(props.lives-1);
      props.setQuestionComplete(true);
      props.setCurrentSongNum(props.currentSongNum + 1);
      props.setCurrentSong(props.unplayedSongs[Math.floor(Math.random() * props.unplayedSongs.length)]);
    } else {

    if ((inputTitle === songTitle) && (inputArtist !== songArtist)) {
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
    if ((inputTitle !== songTitle) && (inputArtist === songArtist)) {
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
    if ((inputTitle !== songTitle) && (inputArtist !== songArtist)) {
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
  }
  };


  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: '100%'}}>
      <div style={{height: '80.0%', width: '100%', display:'flex', flexWrap: 'wrap', justifyContent:'center', alignItems: 'center', marginLeft: '35px'}}>
        <div style={{position: 'relative', border: 'solid', height: '600px', width: '850px', backgroundColor: '#001528', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px', marginTop: '-130px', marginLeft: '100px'}}>
          <div style={{position: 'relative', border: 'dashed #1776ff 3px', height: '585px', width: '835px', backgroundColor: '#001528', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '10px'}}>
              <div style={{position: 'relative', border: 'solid 1px #fafafa', height: '570px', width: '820px', backgroundColor: '#001528', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', borderRadius: '10px', color: '#fafafa'}}>
                <div style={props.beforeStart ? {visibility: "visible", position: 'absolute', top: '23%', color: '#fafafa', fontSize: '75px'} : {visibility: "hidden"}}>
                  Click to Start
                </div>
                <div style={props.beforeStart ? {visibility: "visible", position: 'absolute', top: '43%'} : {visibility: "hidden"}}>
                  <img src={downArrows} alt=""/><img src={downArrows} style={{marginLeft: '60px'}} alt=""/><img src={downArrows} style={{marginLeft: '60px'}} alt=""/>
                </div>
                <div style={{width: '100%', display: 'inline-flex', justifyContent: 'center', fontSize: '60px', alignItems: 'center', position: 'absolute', top: '50px'}}>
                  {props.statusMessage}
                </div>
                <div style={props.questionComplete ? {visibility: "visible", position: 'absolute', top: '28%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width:
              '100%'} : {visibility: "hidden"}}>
                  <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginTop: '5px'}}>
                    <div>
                      <img src={props.completedAlbumArt} alt="" style={{height: '200px', width: '200px', border: 'solid #fafafa 1px', borderRadius: '10px'}}/>
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
                </div>
                <img src={props.statusMessageImg} style={props.statusMessageImg ? {marginRight: '10px', fontSize: '50px', height: '300px', width: '300px', position: 'absolute', top: '380px', left: '660px'} : {visibility: 'hidden'}} alt=""/>
                <Button type="primary" style={props.beforeStart ? {visibility: "visible", height: '75px', width: '400px', fontSize: '28px', padding: '-30%', position: 'absolute', top: '58%', animation:'shake 0.82s cubic-bezier(.36, .07, .19, .97) both infinite'} : {visibility: 'hidden'}}  onClick={(e) => {readyUp(e)}}>Ready!</Button>
                <Button type="primary" style={props.questionComplete ? {visibility: "visible", height: '75px', width: '400px', fontSize: '28px', position: 'absolute', top: '425px'} : {visibility: 'hidden'}}  onClick={(e) => {readyUp(e)}}>Ready!</Button>
              </div>
            </div>
        </div>
      </div>
      <div style={{height: '30.0%', width: '400px', fontSize: '80px', marginLeft: '130px', marginTop: '-120px'}}>
        <Form>
          <div style={{display: 'inline-flex', width: '400px'}}>
            <Input
              size="large"
              placeholder="Song"
              prefix={<AudioOutlined style={{marginRight: '15px'}}/>}
              style={props.titleInputCorrect ? {margin: '10px', border: `solid 2px #38b6ff`, height: '75px', fontSize: '28px', width: '400px'} : {margin: '10px', border: `${props.titleInputBorder}`, height: '75px', fontSize: '24px', width: '400px'}}
              value={props.titleInput}
              border="true"
              disabled={props.disabledTitleInput}
              onChange={(e) => {props.setTitleInput(e.target.value)}}
            />
          </div>
          <div style={{display: 'inline-flex', width: '400px', marginTop: '10px', marginBottom: '0px'}}>
            <Input
              size="large"
              placeholder="Artist"
              prefix={<UserOutlined style={{marginRight: '15px'}}/>}
              style={props.artistInputCorrect ? {margin: '10px', border: `solid 2px #38b6ff`, height: '75px', fontSize: '28px', width: '400px'} : {margin: '10px', border: `${props.artistInputBorder}`, height: '75px', fontSize: '24px', width: '400px'}}
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
            style={{margin: '10px', width: '220px', height: '50px', borderRadius: '5px', color: '#fafafa', border: 'none', fontSize: '24px'}}
            onClick={(e) => {submitGuess(e)}}>
              Guess!
          </Button>
          <Button type="dashed" htmlType="button" disabled={giveUpDisabled} style={{margin: '10px', height: '50px', width: '140px', fontSize: '24px'}} onClick={(e) => {giveUp(e)}}>Give Up</Button>
          </Form.Item>
        </Form>
      </div>

      <Tour open={props.tourOpen} onClose={() => setTourOpen(false)} steps={props.steps} />
    </div>
  );
};

export default Song;