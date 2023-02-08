import React, {useState, useEffect, useRef, useCallback } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { MenuProps, Modal } from 'antd';
import { Button, Layout, Menu, theme, Space, Typography, Steps} from 'antd';
import NewGameMenu from './NewGameMenu.jsx';
import MainMenu from './MainMenu.jsx';
import Song from './Song.jsx';
import GameOver from './GameOver.jsx';
import Leaderboard from './Leaderboard.jsx';
import { songsArray } from './songBank.js'
import { Progress } from 'antd';
import { red, green } from '@ant-design/colors';
import { Howl } from 'howler';
import axios from 'axios';
import Timer from 'timermodule';
import logo from '../public/icons/waveLogo.svg';
import correct from '../public/icons/smile2.svg';
import partial from '../public/icons/neutral.svg';
import incorrect from '../public/icons/frown2.svg';
import shake from './App.css';
import whiteFlower1 from '../public/icons/whiteFlower1.svg';
import whiteFlower2 from '../public/icons/whiteFlower2.svg';
import whiteFlower3 from '../public/icons/whiteFlower3.svg';
import Draggable from 'react-draggable';
import musicalNote2 from '../public/icons/musicalNote2.svg';


const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [songArray, setSongArray] = useState(songsArray);
  const [unplayedSongs, setUnplayedSongs] = useState(songArray.slice());
  const [playedSongs, setPlayedSongs] = useState([]);
  const [mainMenuVisible, setMainMenuVisible] = useState(true);
  const [newGameMenuVisible, setNewGameMenuVisible] = useState(false);
  const [inGame, setInGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [leaderboardVisible, setLeaderboardVisible] = useState(false);
  const [currentGameSettings, setCurrentGameSettings] = useState({});
  const [newGameButtonClicked, setNewGameButtonClicked] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [currentSong, setCurrentSong] = useState(unplayedSongs[Math.floor(Math.random() * songArray.length)]);
  const [currentSongNum, setCurrentSongNum] = useState(1);
  const [numCorrect, setNumCorrect] = useState(0);
  const [numPartiallyCorrect, setNumPartiallyCorrect] = useState(0);
  const [numIncorrect, setNumIncorrect] = useState(0);
  const [questionComplete, setQuestionComplete] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [completedTitle, setCompletedTitle] = useState('');
  const [completedArtist, setCompletedArtist] = useState('');
  const [finalTime, setFinalTime] = useState();
  const [beforeStart, setBeforeStart] = useState(true);
  const [avgTime, setAvgTime] = useState(0);
  const [completedAlbumArt, setCompletedAlbumArt] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [artistInput, setArtistInput] = useState('');
  const [statusMessageImg, setStatusMessageImg] = useState('');

  const [titleInputBorder, setTitleInputBorder] = useState('solid 2px #001528');
  const [artistInputBorder, setArtistInputBorder] = useState('solid 2px #001528');

  const [titleInputCorrect, setTitleInputCorrect] = useState(false);
  const [artistInputCorrect, setArtistInputCorrect] = useState(false);

  const [disabledTitleInput, setDisabledTitleInput] = useState(false);
  const [disabledArtistInput, setDisabledArtistInput] = useState(false);

  const [isCorrectTitleImg, setIsCorrectTitleImg] = useState('');
  const [isCorrectArtistImg, setIsCorrectArtistImg] = useState('');

  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = (e) => {
    e.preventDefault();
    setOpen(false);
    setInGame(false);
    setMainMenuVisible(true);
  };
  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };
  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [leaderboardDisabled, setLeaderboardDisabled] = useState(false);
  const [leaderboardBounds, setLeaderboardBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleLeaderboardRef = useRef(null);
  const showLeaderboardModal = () => {
    setLeaderboardOpen(true);
  };
  const handleLeaderboardOk = (e) => {
    e.preventDefault();
    setLeaderboardOpen(false);
    setInGame(false);
    setLeaderboardVisible(true);
  }
  const handleLeaderboardCancel = (e) => {
    console.log(e);
    setLeaderboardOpen(false);
  };
  const onLeaderboardStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleLeaderboardRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setLeaderboardBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };


  let timerRef = useRef(new Timer());
  let timerObj = timerRef.current;
  let [timer, setTimer] = useState({
    "mytimer" : {
      "time" : {
        mm : "00",
        ss : "00"
      },
      status : "INIT"
    }
  });
  let {mytimer:{time : {mm, ss}, status}} = timer;
  let notifier = useCallback((key, value) => {
    setTimer({
      [key] : value
    });
  }, [timerObj]);

  function onActionClick() {
    status === "INIT" ? timerObj.start("mytimer") : status === "RUNNING" ? timerObj.pause("mytimer") : timerObj.reset("mytimer");
  }

  useEffect(() => {
    timerObj.init({
      data : {
        "mytimer" : {
          time : {
            mm : "00",
            ss : "00"
          },
          status : "INIT"
        }
      },
      notifier : notifier
    });
  }, [timerObj, notifier]);

  useEffect(() => {
    if (currentSongNum > currentGameSettings.songNum) {
      setInGame(false);
      setGameOver(true);
      console.log(`${timer.mytimer.time.mm} : ${timer.mytimer.time.ss}`);
      setFinalTime(`${timer.mytimer.time.mm}:${timer.mytimer.time.ss}`)
    }
  }, [currentSongNum, currentGameSettings.songNum]);

  useEffect(() => {
    if (mainMenuVisible === true) {
      currentSong.mp3.stop();
      setBeforeStart(true);
      setUnplayedSongs(songArray.slice());
      setPlayedSongs([]);
      setCurrentGameSettings({});
      setCurrentScore(0);
      setCurrentSongNum(1);
      setNumCorrect(0);
      setNumPartiallyCorrect(0);
      setNumIncorrect(0);
      setStatusMessage('');
      setCompletedArtist('');
      setCompletedTitle('');
      setCompletedAlbumArt('');
      setStatusMessageImg('');
      setQuestionComplete(false);
      setTitleInputBorder('solid 2px #001528');
      setArtistInputBorder('solid 2px #001528');
      setAvgTime(0);
      timerObj.reset('mytimer');
    }
  }, [mainMenuVisible]);

  useEffect(() => {
    if (currentSongNum > 1) {
      var minToSec = mm * 60;
      var totalSeconds = Number(minToSec) + Number(ss);
      var avgTimeInSeconds = totalSeconds/(currentSongNum);
      setAvgTime(Math.round(avgTimeInSeconds));
    }
  }, [currentSongNum])

  useEffect(() => {
    if (gameOver === true) {
    var newObj = {
      name: currentGameSettings.name,
      difficulty: currentGameSettings.difficulty,
      genre: currentGameSettings.genre,
      score: currentScore,
      songNum: Number(currentGameSettings.songNum),
      correct: numCorrect,
      partiallyCorrect: numPartiallyCorrect,
      incorrect: numIncorrect,
      time: finalTime,
      avg: '10s'
    };

    axios.post('http://localhost:3000/scores', newObj)
    .then(() => {
      // setGameOver(false);
      // setLeaderboardVisible(true);
    }).catch((error) => {
      console.log(error);
    })
  }
  }, [gameOver]);

  const goToLeaderboard = (e) => {
    e.preventDefault();
    setLeaderboardVisible(true);
    setInGame(false);
  }

  const goToMainMenu = (e) => {
    e.preventDefault();
    setMainMenuVisible(true);
    setInGame(false);
  }



  return (
    <Layout>
      <Content style={{ padding: '0 50px'}}>
        <Layout style={ inGame ? { border: 'solid 2px #001528', height: '980px', borderRadius: '7px'} : {height: '980px', backgroundColor: '#001528', borderRadius: '7px'}}>
          <Sider style={ inGame === true ? {display: 'block', height: '977px'} : {display: 'none'}}>
            <div style={{backgroundColor: '#001528', height: '977px', width: '347px', zIndex: '-2', borderRight: '1px #001528 solid'}}>
              <div style={{backgroundColor: '#001528', height: '977px', width: '342px', zIndex: '-1', borderRight: '3px #1776ff dashed'}}>
                <div style={{backgroundColor: '#001528', height: '977px', width: '334px', zIndex: '-1', borderRight: '1px #fafafa solid'}}>

                  <div style={{height: '40%', color: '#fafafa', display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', justifyContent: 'center'}}>
                    <div style={{width: '100%', height: '150px', fontSize: '28px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', marginTop: '20px'}}>
                      <img src={whiteFlower2} style={{height: '300px', width: '300px'}} alt=""/>
                    </div>
                    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '-60px', borderRadius: '50%', backgroundColor: '#001528', zIndex: '10', color: '#fafafa', width: '135px', height: '135px', border: 'solid 1px #001528'}}>
                    <div style={{fontSize: '24px', color: '#fafafa', marginBottom: '-80px'}}>
                      Song
                      </div>
                      <div style={{fontSize: '75px', marginTop: '0px', marginBottom: '0px', width: '100%', display: 'flex', justifyContent: 'center'}}>
                        #{currentSongNum}
                      </div>
                    </div>
                  </div>

                  <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                    <div style={{color: '#1776ff', fontSize: '60px', width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '-65px'}}>
                      {mm}:{ss}
                    </div>
                    <div style={{color: '#fafafa', fontSize: '24px', marginTop: '5px'}}>
                    {currentGameSettings.difficulty} | {currentGameSettings.genre}
                    </div>
                  </div>

              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', color: '#fafafa', fontSize: '60px', backgroundColor: '#001528', marginTop: '25px', marginLeft: '0px'}}>
                <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <img src={correct} style={{marginRight: '20px', height: '75px', width: '75px', paddingBottom: '5px'}} alt=""/> {numCorrect}
                </div>
                <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <img src={partial} style={{marginRight: '20px', height: '75px', width: '75px', paddingBottom: '5px'}} alt=""/> {numPartiallyCorrect}
                </div>
                <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <img src={incorrect} style={{marginRight: '20px', height: '75px', width: '75px'}} alt=""/> {numIncorrect}
                </div>
              </div>
              <div style={{fontSize: '24px', color: '#fafafa', justifyContent: 'center', marginLeft:'35%'}}>
                      {currentGameSettings.songNum} <img src={musicalNote2} style={{height: '45px', width: '45px', paddingTop: '30px', marginLeft: '-18px', marginRight: '-18px'}}/>  | {currentScore} Pts
                      </div>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-end', alignContent: 'flex-end', position: 'absolute', bottom: '15px', left: '20px'}}>
              <div><Button type='primary' style={{margin: '10px', width: '270px', height: '50px', fontSize: '24px'}}>How to Play</Button></div>
              <div><Button type='primary' style={{margin: '10px', width: '270px', height: '50px', fontSize: '24px'}} onClick={(e) => {showLeaderboardModal(e)}}>Leaderboard</Button></div>
              <div><Button type='primary' style={{margin: '10px', width: '270px', height: '50px', fontSize: '24px'}} onClick={showModal}>Main Menu</Button></div>
            </div>
            </div>
            </div>
            </div>
          </Sider>

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
            <div style={ mainMenuVisible === false ? {display: 'none'} : {display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', left: '18%', top: '6.5%'}}>
                <MainMenu
                  setNewGameButtonClicked={setNewGameButtonClicked}
                  setMainMenuVisible={setMainMenuVisible}
                  setNewGameMenuVisible={setNewGameMenuVisible}
                  setLeaderboardVisible={setLeaderboardVisible}
                />
              </div>
              <div style={ newGameMenuVisible === true ? {display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '18%', top: '6.5%'} : {display: 'none'}}>
                <NewGameMenu
                  setCurrentGameSettings={setCurrentGameSettings}
                  setNewGameMenuVisible={setNewGameMenuVisible}
                  setMainMenuVisible={setMainMenuVisible}
                  setInGame={setInGame}
                />
              </div>
              <div style={inGame === true ? {display: 'block', width: '100%'} : {display: 'none'}}>
                <Song
                  setNewGameButtonClicked={setNewGameButtonClicked}
                  newGameButtonClicked={newGameButtonClicked}
                  songArray={songArray}
                  unplayedSongs={unplayedSongs}
                  setUnplayedSongs={setUnplayedSongs}
                  playedSongs={playedSongs}
                  setPlayedSongs={setPlayedSongs}
                  currentScore={currentScore}
                  setCurrentScore={setCurrentScore}
                  currentSong={currentSong}
                  setCurrentSong={setCurrentSong}
                  currentSongNum={currentSongNum}
                  setCurrentSongNum={setCurrentSongNum}
                  numCorrect={numCorrect}
                  setNumCorrect={setNumCorrect}
                  numPartiallyCorrect={numPartiallyCorrect}
                  setNumPartiallyCorrect={setNumPartiallyCorrect}
                  numIncorrect={numIncorrect}
                  setNumIncorrect={setNumIncorrect}
                  setInGame={setInGame}
                  setGameOver={setGameOver}
                  questionComplete={questionComplete}
                  setQuestionComplete={setQuestionComplete}
                  statusMessage={statusMessage}
                  setStatusMessage={setStatusMessage}
                  completedTitle={completedTitle}
                  setCompletedTitle={setCompletedTitle}
                  completedArtist={completedArtist}
                  setCompletedArtist={setCompletedArtist}
                  completedAlbumArt={completedAlbumArt}
                  setCompletedAlbumArt={setCompletedAlbumArt}
                  onActionClick={onActionClick}
                  beforeStart={beforeStart}
                  setBeforeStart={setBeforeStart}
                  titleInput={titleInput}
                  setTitleInput={setTitleInput}
                  artistInput={artistInput}
                  setArtistInput={setArtistInput}
                  titleInputBorder={titleInputBorder}
                  setTitleInputBorder={setTitleInputBorder}
                  artistInputBorder={artistInputBorder}
                  setArtistInputBorder={setArtistInputBorder}
                  titleInputCorrect={titleInputCorrect}
                  setTitleInputCorrect={setTitleInputCorrect}
                  artistInputCorrect={artistInputCorrect}
                  setArtistInputCorrect={setArtistInputCorrect}
                  disabledTitleInput={disabledTitleInput}
                  setDisabledTitleInput={setDisabledTitleInput}
                  disabledArtistInput={disabledArtistInput}
                  setDisabledArtistInput={setDisabledArtistInput}
                  isCorrectTitleImg={isCorrectTitleImg}
                  setIsCorrectTitleImg={setIsCorrectTitleImg}
                  isCorrectArtistImg={isCorrectArtistImg}
                  setIsCorrectArtistImg={setIsCorrectArtistImg}
                  currentGameSettings={currentGameSettings}
                  setCurrentGameSettings={setCurrentGameSettings}
                  statusMessageImg={statusMessageImg}
                  setStatusMessageImg={setStatusMessageImg}
                />
              </div>
              <div style={ gameOver === true ? {display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '18%', top: '6.5%'} : {display: 'none'}}>
                <GameOver
                  currentScore={currentScore}
                  numCorrect={numCorrect}
                  numPartiallyCorrect={numPartiallyCorrect}
                  numIncorrect={numIncorrect}
                  setGameOver={setGameOver}
                  setMainMenuVisible={setMainMenuVisible}
                  currentGameSettings={currentGameSettings}
                  setLeaderboardVisible={setLeaderboardVisible}
                  finalTime={finalTime}
                  setQuestionComplete={setQuestionComplete}
                  titleInput={titleInput}
                  setTitleInput={setTitleInput}
                  artistInput={artistInput}
                  setArtistInput={setArtistInput}
                  titleInputBorder={titleInputBorder}
                  setTitleInputBorder={setTitleInputBorder}
                  artistInputBorder={artistInputBorder}
                  setArtistInputBorder={setArtistInputBorder}
                  titleInputCorrect={titleInputCorrect}
                  setTitleInputCorrect={setTitleInputCorrect}
                  artistInputCorrect={artistInputCorrect}
                  setArtistInputCorrect={setArtistInputCorrect}
                  disabledTitleInput={disabledTitleInput}
                  setDisabledTitleInput={setDisabledTitleInput}
                  disabledArtistInput={disabledArtistInput}
                  setDisabledArtistInput={setDisabledArtistInput}
                  isCorrectTitleImg={isCorrectTitleImg}
                  setIsCorrectTitleImg={setIsCorrectTitleImg}
                  isCorrectArtistImg={isCorrectArtistImg}
                  setIsCorrectArtistImg={setIsCorrectArtistImg}
                  setBeforeStart={setBeforeStart}
                  setAvgTime={setAvgTime}
                  avgTime={avgTime}
                  setTimer={setTimer}
                  completedAlbumArt={completedAlbumArt}
                  completedArtist={completedArtist}
                  completedTitle={completedTitle}
                />
              </div>
              <div style={ leaderboardVisible === true ? {display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '18%', top: '6.5%'} : {display: 'none'}}>

                <Leaderboard
                  leaderboardVisible={leaderboardVisible}
                  setLeaderboardVisible={setLeaderboardVisible}
                  setMainMenuVisible={setMainMenuVisible}
                />
              </div>
              <Modal
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
              fontSize: '24px'
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {setDisabled(true);}}
            onFocus={() => {}}
            onBlur={() => {}}>
              Are you sure?
          </div>
        }
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <div style={{fontSize: '18px'}}>By returning to the main menu, <b>all progress will be lost</b>!</div>
      </Modal>
      <Modal
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
              fontSize: '24px'
            }}
            onMouseOver={() => {
              if (leaderboardDisabled) {
                setLeaderboardDisabled(false);
              }
            }}
            onMouseOut={() => {setLeaderboardDisabled(true);}}
            onFocus={() => {}}
            onBlur={() => {}}>
              Are you sure?
          </div>
        }
        open={leaderboardOpen}
        onOk={handleLeaderboardOk}
        onCancel={handleLeaderboardCancel}
        modalRender={(modal) => (
          <Draggable
            disabled={leaderboardDisabled}
            bounds={leaderboardBounds}
            onStart={(event, uiData) => onLeaderboardStart(event, uiData)}
          >
            <div ref={draggleLeaderboardRef}>{modal}</div>
          </Draggable>
        )}
      >
        <div style={{fontSize: '18px'}}>By navigating to the leaderboard, <b>all progress will be lost</b>!</div>
      </Modal>
            </div>
        </Layout>
      </Content>
    </Layout>
  );
};

export default App;