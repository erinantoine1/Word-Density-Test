import React, {useState, useEffect, useRef, useCallback } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { MenuProps, Modal } from 'antd';
import { Button, Layout, Menu, theme, Space, Typography, Steps, Tag} from 'antd';
import NewGameMenu from './NewGameMenu.jsx';
import MainMenu from './MainMenu.jsx';
import Tutorial from './Tutorial.jsx';
import Song from './Song.jsx';
import GameOver from './GameOver.jsx';
import Leaderboard from './Leaderboard.jsx';
import { songsArray, popSongsArray, rockSongsArray } from './songBank.js'
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
import noRainAlbumArt from '../public/icons/albumArt/noRainAlbumArt.jpeg';
import billieJeanAlbumArt from '../public/icons/albumArt/billieJeanAlbumArt.jpeg';
import youOughtaKnowAlbumArt from '../public/icons/albumArt/youOughtaKnowAlbumArt.jpeg';


const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // const [songArray, setSongArray] = useState(songsArray);
  // const [unplayedSongs, setUnplayedSongs] = useState(songArray.slice());
  // const [currentSong, setCurrentSong] = useState(unplayedSongs[Math.floor(Math.random() * songArray.length)]);
  const [lives, setLives] = useState(3);
  const [songArray, setSongArray] = useState([]);
  const [unplayedSongs, setUnplayedSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState();
  const [playedSongs, setPlayedSongs] = useState([]);
  const [mainMenuVisible, setMainMenuVisible] = useState(true);
  const [newGameMenuVisible, setNewGameMenuVisible] = useState(false);
  const [inGame, setInGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [leaderboardVisible, setLeaderboardVisible] = useState(false);
  const [currentGameSettings, setCurrentGameSettings] = useState({});
  const [newGameButtonClicked, setNewGameButtonClicked] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);

  const [currentSongNum, setCurrentSongNum] = useState(1);
  const [numCorrect, setNumCorrect] = useState(0);
  const [numPartiallyCorrect, setNumPartiallyCorrect] = useState(0);
  const [numIncorrect, setNumIncorrect] = useState(0);
  const [questionComplete, setQuestionComplete] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [completedTitle, setCompletedTitle] = useState('');
  const [completedArtist, setCompletedArtist] = useState('');
  const [finalTime, setFinalTime] = useState({});
  const [beforeStart, setBeforeStart] = useState(true);
  const [avgTime, setAvgTime] = useState({});
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
  const [inTutorial, setInTutorial] = useState(false);

  const [displayTutorialReadyButton, setDisplayTutorialReadyButton] = useState(true);
  const [displayTutorialFeedback, setDisplayTutorialFeedback] = useState(false);

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

  ////////
  const showTutorial = (e) => {
    e.preventDefault();
    setMainMenuVisible(false);
    setInGame(false);
    setInTutorial(true);
    setDisplayTutorialReadyButton(true);
    setTourOpen(true)
  }

  const closeTutorial = () => {
    setInTutorial(false);
    setMainMenuVisible(true);
    setTourOpen(false)
  }

  const [tutorialWarnOpen, setTutorialWarnOpen] = useState(false);
  const [tutorialWarnDisabled, setTutorialWarnDisabled] = useState(false);
  const [tutorialWarnBounds, setTutorialWarnBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleTutorialWarnRef = useRef(null);
  const showTutorialWarnModal = (e) => {
    e.preventDefault();
    setTutorialWarnOpen(true);
  };
  const handleTutorialWarnOk = (e) => {
    e.preventDefault();
    setInGame(false);
    // setInTutorial(true);
    setTutorialWarnOpen(false);
    showTutorial(e);
  }

  const handleTutorialWarnCancel = (e) => {
    console.log(e);
    setTutorialWarnOpen(false);
  };
  const onTutorialWarnStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleTutorialWarnRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setTutorialWarnBounds({
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
    if (currentSongNum > currentGameSettings.songNum || lives === 0) {
      setInGame(false);
      setGameOver(true);
      const addTogether = (num1, num2) => {
        console.log('NUM1: ', num1 *60)
        console.log('NUM2: ', num2)
        console.log('num1 type: ', typeof num1);
        console.log('num2 type: ', typeof num2);
        const sum = (num1 * 60) + Number(num2);
        console.log('SUM: ', sum)
        return sum;
      }
      console.log(`${timer.mytimer.time.mm} : ${timer.mytimer.time.ss}`);
      setFinalTime({minutes: timer.mytimer.time.mm, seconds: timer.mytimer.time.ss, string: `${timer.mytimer.time.mm}:${timer.mytimer.time.ss}`, totalSeconds: addTogether(timer.mytimer.time.mm, timer.mytimer.time.ss)})
    }
  }, [currentSongNum, currentGameSettings.songNum]);

  useEffect(() => {
    if (mainMenuVisible === true) {
      if (currentSong !== undefined) {currentSong.mp3.stop()};
      setBeforeStart(true);
      //setUnplayedSongs(songArray.slice());
      setUnplayedSongs([]);
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
      setAvgTime({});
      setLives(3);
      timerObj.reset('mytimer');
    }
  }, [mainMenuVisible]);

  const calculateAvgTime = () => {
    const totalSeconds = Number(finalTime.minutes * 60) + Number(finalTime.seconds); // 125 s
    const secondsPerSong = totalSeconds/currentGameSettings.songNum; // 12 s
    const avgMin = () => {
      if (secondsPerSong < 60) {
        return '00';
      }

      if (secondsPerSong >= 60) {
        const minPerSong = Math.floor(secondsPerSong/60);
        if (minPerSong < 10) {
          return `0${minPerSong}`
        }

        if (minPerSong >= 10) {
          return minPerSong
        }
      }
    }

    const avgSec = (Math.floor(secondsPerSong%60) < 10 ? `0${Math.floor(secondsPerSong%60)}` : Math.floor(secondsPerSong%60));
    const avgString = `${avgMin()}:${avgSec}`
    setAvgTime({minutes: avgMin(), seconds: avgSec, secondsPerSong: secondsPerSong, string: avgString})
    return secondsPerSong;
  };


  useEffect(() => {
    if (gameOver === true && lives !== 0) {
    var newObj = {
      name: currentGameSettings.name,
      difficulty: currentGameSettings.difficulty,
      genre: currentGameSettings.genre,
      score: currentScore,
      songNum: Number(currentGameSettings.songNum),
      correct: numCorrect,
      partiallyCorrect: numPartiallyCorrect,
      incorrect: numIncorrect,
      time: finalTime.totalSeconds,
      avg: calculateAvgTime()
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


  const getCorrectFeedback = () => {
    setDisplayTutorialFeedback(true);
    setStatusMessage("You're killing it! (+2 Pts)");
    setCompletedArtist('Blind Melon');
    setCompletedTitle('No Rain');
    setCompletedAlbumArt(noRainAlbumArt);
    setQuestionComplete(true);
  }

  const getPartiallyCorrectFeedback = () => {
    setDisplayTutorialFeedback(true);
    setStatusMessage(`Maybe next time! (+1 Pt)`);
    setCompletedArtist('Michael Jackson');
    setCompletedTitle('Billie Jean');
    setCompletedAlbumArt(billieJeanAlbumArt);
    setQuestionComplete(true);
  }

  const getIncorrectFeedback = () => {
    setDisplayTutorialFeedback(true);
    setStatusMessage(`Maybe next round! (+0 Pts)`);
    setCompletedArtist('Alanis Morrisette');
    setCompletedTitle('You Oughta Know');
    setCompletedAlbumArt(youOughtaKnowAlbumArt);
    setQuestionComplete(true);
  }


  const tourRef = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();
  const ref7 = useRef();
  const ref8 = useRef();
  const ref9 = useRef();
  const ref10 = useRef();
  const ref11 = useRef();
  const ref12 = useRef();
  const ref13 = useRef();

  const gameStartInfo = () => {
    return (
      <div>
        <ul>
          <li>To begin the game, you will click the "Ready!" button.</li>
          <li>For now, just click the "Next" button to go to the next step.</li>
        </ul>
    </div>
    );
  };

  const makeGuessInfo = () => {
    return (
      <div>
        <ul>
          <li>Make a guess by typing the song title and/or artist. Click 'Guess!' button or "Enter" key to submit your guess.</li>
          <li><b>Spelling counts, but punctuation/capitalization do not.</b></li>
          <li>Once a correct input has been provided for the title and/or artist, the corresponding field will become disabled until the song is complete.</li>
          <li><b>You get unlimited guesses for each song</b> until you press the 'Give Up' button, or you get both the song and artist correct.</li>
        </ul>
    </div>
    );
  };

  const correctFeedbackInfo = () => {
    return (
      <div>
        <ul>
          <li>If both the song title and artist are correct, you will see feedback similar to this (and earn 2 pts).</li>
        </ul>
    </div>
    );
  };

  const partiallyCorrectFeedbackInfo = () => {
    return (
      <div>
        <ul>
          <li><b>Easy Difficulty ONLY: </b>If you click 'Give Up', and have either the song or title correct, you will see feedback similar to this (and earn 1 pt).</li>
        </ul>
    </div>
    );
  };

  const IncorrectFeedbackInfo = () => {
    return (
      <div>
        <ul>
          <li>If you click 'Give Up', and both the song title and artist are incorrect, you will see feedback similar to this (and earn 0 pts).</li>
        </ul>
    </div>
    );
  };

  const startNextRoundInfo = () => {
    return (
      <div>
        <ul>
          <li>To move onto the next song, click the 'Ready!' button again.</li>
        </ul>
    </div>
    );
  };

  const leftSidebarInfo = () => {
    return (
      <div>
        <ul>
          <li>The left sidebar contains important information for players regarding game progress/performance/settings.</li>
          <li>Click "Next" to explore the features of the left sidebar.</li>
        </ul>
    </div>
    );
  };

  const difficultySelectionInfo = () => {
    return (
      <div>
        <b>Easy:</b>
        <ul>
          <li>Two points for correct song and artist</li>
          <li>One point for having either song title OR artist</li>
          <li>Zero points if neither are correct</li>
        </ul>
        <b>Medium:</b>
        <ul>
          <li>Two points for correct song and artist</li>
          <li>Zero points if neither are correct</li>
        </ul>
        <b>Hard:</b>
        <ul>
          <li>Two points for correct song and artist</li>
          <li>Zero points if neither are correct</li>
          <li>Limited to 3 lives (will be shown in left sidebar)</li>
          <li>Score is not added to leaderboard if you run out of lives</li>
        </ul>
    </div>
    );
  }

  const [tourOpen, setTourOpen] = useState(false);
  const steps = [
    {
      title: 'Game Start',
      description: gameStartInfo(),
      target: () => ref9.current,
      placement: 'bottom',
      nextButtonProps: {onClick: () => {setDisplayTutorialReadyButton(false)}},
    },
    {
      title: 'Making a Guess',
      description: makeGuessInfo(),
      target: () => ref10.current,
      placement: 'top',
      nextButtonProps: {onClick: () => {getCorrectFeedback()}},
      prevButtonProps: {onClick: () => {setDisplayTutorialReadyButton(true)}},
    },
    {
      title: 'Feedback/Scoring',
      description: correctFeedbackInfo(),
      target: () => ref11.current,
      placement: 'bottom',
      nextButtonProps: {onClick: () => {getPartiallyCorrectFeedback()}}
    },
    {
      title: 'Feedback/Scoring',
      description: partiallyCorrectFeedbackInfo(),
      target: () => ref11.current,
      placement: 'bottom',
      nextButtonProps: {onClick: () => {getIncorrectFeedback()}}
    },
    {
      title: 'Feedback/Scoring',
      description: IncorrectFeedbackInfo(),
      target: () => ref11.current,
      placement: 'bottom',
      nextButtonProps: {onClick: () => {getIncorrectFeedback()}}
    },
    {
      title: 'Start Next Round',
      description: startNextRoundInfo(),
      target: () => ref12.current,
      placement: 'bottom',
    },
    {
      title: 'Left Sidebar',
      description: leftSidebarInfo(),
      target: () => ref13.current,
      placement: 'right',
    },
    {
      title: 'Left Sidebar',
      description: 'Current Song #',
      placement: 'right',
      target: () => ref4.current,
    },
    {
      title: 'Left Sidebar',
      description: 'Game Duration (mm:ss)',
      placement: 'right',
      target: () => ref5.current,
    },
    {
      title: 'Left Sidebar',
      description: 'Game Difficulty | Song Genre',
      placement: 'right',
      target: () => ref1.current,
    },
    {
      title: 'Left Sidebar',
      description: '# of Songs Correct',
      placement: 'right',
      target: () => ref6.current,
    },
    {
      title: 'Left Sidebar',
      description: '# of Songs Partially Correct',
      placement: 'right',
      target: () => ref7.current,
    },
    {
      title: 'Left Sidebar',
      description: '# of Songs Incorrect',
      placement: 'right',
      target: () => ref8.current,
    },
    {
      title: 'Left Sidebar',
      description: 'Total # of Songs in Game | Score',
      placement: 'right',
      target: () => ref2.current,
    },
    {
      title: 'Difficulty Selection',
      description: difficultySelectionInfo(),
      target: null,
    },
  ];





      useEffect(() => {
          if (currentGameSettings.genre === 'Random') {
            setSongArray(songsArray);
            setUnplayedSongs(songsArray.slice());
            setCurrentSong(songsArray.slice()[Math.floor(Math.random() * songsArray.slice().length)]);
          }
          if (currentGameSettings.genre === 'Pop') {
            setSongArray(popSongsArray);
            setUnplayedSongs(popSongsArray.slice());
            setCurrentSong(popSongsArray.slice()[Math.floor(Math.random() * popSongsArray.slice().length)]);

          }
          if (currentGameSettings.genre === 'Alt/Rock') {
            setSongArray(rockSongsArray);
            setUnplayedSongs(rockSongsArray.slice());
            setCurrentSong(rockSongsArray.slice()[Math.floor(Math.random() * rockSongsArray.slice().length)]);

          }
      }, [currentGameSettings.genre])


  return (
    <Layout>
      <Content style={{ padding: '0 50px'}}>
        <Layout style={ inGame || inTutorial ? { border: 'solid 2px #001528', height: '980px', borderRadius: '7px'} : {height: '980px', backgroundColor: '#001528', borderRadius: '7px'}}>
          <Sider style={ inGame === true || inTutorial === true ? {display: 'block', height: '977px'} : {display: 'none'}}>
            <div style={{backgroundColor: '#001528', height: '977px', width: '347px', zIndex: '-2', borderRight: '1px #001528 solid'}} ref={ref13}>
              <div style={{backgroundColor: '#001528', height: '977px', width: '342px', zIndex: '-1', borderRight: '3px #1776ff dashed'}}>
                <div style={{backgroundColor: '#001528', height: '977px', width: '334px', zIndex: '-1', borderRight: '1px #fafafa solid'}}>

                  <div style={{height: '40%', color: '#fafafa', display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', justifyContent: 'center'}}>
                    <div style={{width: '100%', height: '150px', fontSize: '28px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', marginTop: '20px'}}>
                      <img src={whiteFlower2} style={{height: '300px', width: '300px'}} alt="" ref={ref4}/>
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
                    <div style={{color: '#1776ff', fontSize: '60px', width: '60%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '-65px'}} ref={ref5}>
                      {mm}:{ss}
                    </div>
                    <div style={inGame ? {color: '#fafafa', fontSize: '24px', marginTop: '5px'} : {display: 'none'}} >
                    {currentGameSettings.difficulty} | {currentGameSettings.genre}
                    </div>
                    <div style={inTutorial ? {color: '#fafafa', fontSize: '24px', marginTop: '5px'} : {display: 'none'}} ref={ref1}>
                    Easy | Random
                    </div>
                  </div>

              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', color: '#fafafa', fontSize: '60px', backgroundColor: '#001528', marginTop: '25px', marginLeft: '20%', width: '60%'}}>
                <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '5px'}} ref={ref6}>
                  <img src={correct} style={{marginRight: '20px', height: '75px', width: '75px'}} alt=""/> {numCorrect}
                </div>
                <div style={currentGameSettings.difficulty !== "Medium" && currentGameSettings.difficulty !== "Hard" ? {width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '5px'} : {display: 'none'}} ref={ref7}>
                  <img src={partial} style={{marginRight: '20px', height: '75px', width: '75px'}} alt=""/> {numPartiallyCorrect}
                </div>
                <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} ref={ref8}>
                  <img src={incorrect} style={{marginRight: '20px', height: '75px', width: '75px'}} alt=""/> {numIncorrect}
                </div>
              </div>
              <div style={inGame ? {fontSize: '24px', color: '#fafafa', justifyContent: 'center', marginLeft:'35%'} : {display: 'none'}}>
                      {currentGameSettings.songNum} <img src={musicalNote2} style={{height: '45px', width: '45px', paddingTop: '30px', marginLeft: '-18px', marginRight: '-18px'}}/>  | {currentScore} Pts
                      </div>
              <div ref={ref2} style={inTutorial ? {fontSize: '24px', color: '#fafafa', display: 'inline-flex', justifyContent: 'center', marginLeft:'35%', marginTop: '20px'}: {display: 'none'}} >
                      <div style={{marginTop: '-22px'}}>10 <img src={musicalNote2} style={{height: '45px', width: '45px', paddingTop: '30px', marginLeft: '-18px', marginRight: '-18px'}}/></div> |
                      <div>
                      {currentScore} Pts
                      </div>
                      </div>
              <div style={currentGameSettings.difficulty === "Hard" ? {display: 'flex', justifyContent: 'center', color: '#1776ff', fontSize: '50px', marginTop: '20px', borderBottom: '3px dashed #1776ff', marginLeft: '90px', marginRight: '90px', paddingBottom: '5px'} : {display: 'none'}}>
                <UserOutlined style={lives < 3 ? {color: '#001528'} : {color: '#1776ff'}}/>
                <UserOutlined style={lives < 2 ? {color: '#001528'} : {color: '#1776ff'}}/>
                <UserOutlined style={lives < 1 ? {color: '#001528'} : {color: '#1776ff'}}/>
              </div>

            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-end', alignContent: 'flex-end', position: 'absolute', bottom: '15px', left: '20px'}}>
              <div><Button type='primary' style={{margin: '10px', width: '270px', height: '50px', fontSize: '24px'}} onClick={(e) => {showTutorialWarnModal(e)}}>How to Play</Button></div>
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
                  inTutorial={inTutorial}
                  setInTutorial={setInTutorial}
                  showTutorial={showTutorial}
                />
              </div>
              <div style={ newGameMenuVisible === true ? {display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '18%', top: '6.5%'} : {display: 'none'}}>
                <NewGameMenu
                  setCurrentGameSettings={setCurrentGameSettings}
                  setNewGameMenuVisible={setNewGameMenuVisible}
                  setMainMenuVisible={setMainMenuVisible}
                  setInGame={setInGame}
                  inTutorial={inTutorial}
                  setInTutorial={setInTutorial}
                  showTutorial={showTutorial}
                />
              </div>
              <div style={inTutorial === true ? {display: 'block', width: '100%'} : {display: 'none'}}>
                <Tutorial
                  setNewGameButtonClicked={setNewGameButtonClicked}
                  newGameButtonClicked={newGameButtonClicked}
                  songArray={songArray}
                  setSongArray={setSongArray}
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
                  lives={lives}
                  setLives={setLives}
                  tourRef={tourRef}
                  tourOpen={tourOpen}
                  setTourOpen={setTourOpen}
                  steps={steps}
                  inTutorial={inTutorial}
                  setInTutorial={setInTutorial}
                  ref9={ref9}
                  ref10={ref10}
                  ref11={ref11}
                  ref12={ref12}
                  displayTutorialReadyButton={displayTutorialReadyButton}
                  setDisplayTutorialReadyButton={setDisplayTutorialReadyButton}
                  displayTutorialFeedback={displayTutorialFeedback}
                  setDisplayTutorialFeedback={setDisplayTutorialFeedback}
                  closeTutorial={closeTutorial}
                />
              </div>
              <div style={inGame === true ? {display: 'block', width: '100%'} : {display: 'none'}}>
                <Song
                  setNewGameButtonClicked={setNewGameButtonClicked}
                  newGameButtonClicked={newGameButtonClicked}
                  songArray={songArray}
                  setSongArray={setSongArray}
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
                  lives={lives}
                  setLives={setLives}
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
                  goToLeaderboard={goToLeaderboard}
                  lives={lives}
                />
              </div>
              <div style={ leaderboardVisible === true ? {display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: '18%', top: '6.5%'} : {display: 'none'}}>

                <Leaderboard
                  leaderboardVisible={leaderboardVisible}
                  setLeaderboardVisible={setLeaderboardVisible}
                  setMainMenuVisible={setMainMenuVisible}
                  setGameOver={setGameOver}
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
      <Modal
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
              fontSize: '24px'
            }}
            onMouseOver={() => {
              if (tutorialWarnDisabled) {
                setTutorialWarnDisabled(false);
              }
            }}
            onMouseOut={() => {setTutorialWarnDisabled(true);}}
            onFocus={() => {}}
            onBlur={() => {}}>
              Are you sure?
          </div>
        }
        open={tutorialWarnOpen}
        onOk={(e) => {handleTutorialWarnOk(e)}}
        onCancel={handleTutorialWarnCancel}
        modalRender={(modal) => (
          <Draggable
            disabled={tutorialWarnDisabled}
            bounds={tutorialWarnBounds}
            onStart={(event, uiData) => onTutorialWarnStart(event, uiData)}
          >
            <div ref={draggleTutorialWarnRef}>{modal}</div>
          </Draggable>
        )}
      >
        <div style={{fontSize: '18px'}}>By navigating to the Tutorial, <b>all progress will be lost</b>!</div>
      </Modal>
            </div>
        </Layout>
      </Content>
    </Layout>
  );
};

export default App;