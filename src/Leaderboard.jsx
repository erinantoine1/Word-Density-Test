import React, { useState, useEffect } from 'react';
import { Button, Radio, Tooltip, ConfigProvider, Tabs, Textfield, Tag} from 'antd';
import axios from 'axios';
import {
  InfoCircleOutlined, CloseCircleOutlined, FilterOutlined
} from '@ant-design/icons';
import correct from '../public/icons/smile2.svg';
import partial from '../public/icons/neutral.svg';
import incorrect from '../public/icons/frown2.svg';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import whiteFlower from '../public/icons/whiteFlower.svg';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import blackNote from '../public/icons/blackNote.svg';

const Leaderboard = (props) => {

   const [scoresArray, setScoresArray] = useState([]);
  const [size, setSize] = useState('large');
  const TabPane = Tabs.TabPane;
  const [genreValue, setGenreValue] = useState('All Genres');
  const [difficultyValue, setDifficultyValue] = useState('All Difficulties');
  const [songNumValue, setSongNumValue] = useState('All # of Songs');

  useEffect(() => {
    if (props.leaderboardVisible) {
      axios.get('/scores').then((response) => {
        setScoresArray(response.data);
      });
    }
  }, [props.leaderboardVisible]);

  const goToMainMenu = (e) => {
    e.preventDefault();
    props.setLeaderboardVisible(false);
    props.setGameOver(false);

    props.setMainMenuVisible(true);

  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#001528',
      color: '#fafafa',
      fontSize: 28,
      borderTop: '3px solid #fafafa',
      borderBottom: '3px solid #fafafa',
      paddingTop: '10px',
      paddingBottom: '10px'
    },
    [`&.${tableCellClasses.body}`]: {
      color: '#fafafa',
      backgroundColor: '#001528',
      overflow: 'scroll',
      fontSize: 22,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // '& .MuiTableRow-root': {
    //   maxHeight: '100px',
    // },
    // '& th': {
    //   height: '100px'
    // },
    // '& tr td': {
    //    height: 'auto !important'
    // },
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
      height: 100,
      maxHeight: 100
    },
    '& tr': {
      height: '100px',
      maxHeight: 100
    },
    '& tr td': {
       height: '100px !important'
    },
  }));


  const resetButtonClicked = (e) => {
    e.preventDefault();
    setDifficultyValue('All Difficulties');
    setGenreValue('All Genres');
    setSongNumValue('All # of Songs');
  };

  useEffect(()=> {
    const newObj = {
      genreValue: genreValue,
      difficultyValue: difficultyValue,
      songNumValue: songNumValue
    }

    axios.get('http://localhost:3000/scores', {params: newObj})
    .then((response) => {
      console.log('Response for Client: ', response.data);
      setScoresArray(response.data);
    }).catch((error) => {
      console.log(error);
    })
  }, [songNumValue, difficultyValue, genreValue])

  const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
    '& .Mui-focused': {
      color: '#fafafa',
      fontSize: '14px',
    },
    color: '#fafafa',
    position: 'absolute',
    left: '40px',
    fontSize: '22px',
    zIndex: '1',
  }));

  const StyledSelect = styled(Select)(({ theme }) => ({
    '.Mui-focused': {
      border: '0px solid #1776ff'
    },
    color: '#1776ff',
    "& .MuiSvgIcon-root": {
      color: "#fafafa"
    },
    marginLeft: '20px',
    width: '306px',
    border: '3px solid #fafafa',
    borderRadius: '7px',
    height: '50px'
  }));

  const formatTime = (time) => {
    //console.log('LEADERBOARD TIME: ', time);
    const avgMin = () => {
      if (time < 60) {
        return '00';
      }

      if (time >= 60) {
        const minPerSong = Math.floor(time/60);
        if (minPerSong < 10) {
          return `0${minPerSong}`
        }

        if (minPerSong >= 10) {
          return minPerSong
        }
      }
    }

    const avgSec = (Math.floor(time%60) < 10 ? `0${Math.floor(time%60)}` : Math.floor(time%60));
    const avgString = `${avgMin()}:${avgSec}`

    return (avgString === 'undefined:NaN' ? time : avgString);
  };

  return (
    <div style={{backgroundColor: '#001528', height: '867px', width: '1157px', padding: '5px', borderRadius: '10px', border: '1px solid #fafafa'}}>
      <div style={{border: 'dashed #1776ff 3px', height: '855px', width: '1145px', padding: '5px', borderRadius: '10px'}}>
        <div style={{display: 'inline-flex', justifyContent: 'space-between', width: '100%', padding: '10px'}}>
          <Button style={{fontSize: '40px', backgroundColor: '#001528', borderRadius: '50%', height: '50px', width: '50px'}} onClick={(e) => {goToMainMenu(e)}}>
            <CloseCircleOutlined style={{fontSize: '50px', color: '#fafafa', borderRadius: '50%', height: '50px', width: '50px', marginLeft: '-15px', marginTop: '-5px'}}/>
          </Button>
          <Tooltip title="How to Play" placement='right' color='red' key='red'>
            <InfoCircleOutlined style={{fontSize: '50px', color: '#fafafa'}}/>
          </Tooltip>
        </div>
      </div>
      <div style={{fontSize: '125', margin: '10px', color: '#1776ff', marginTop: '-74%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>Leaderboard</div>
      <div style={{marginTop: '-5px'}}>
      <TableContainer style={{maxHeight: 550, width: 1160, overflowX: 'hidden'}}>
      <Table stickyHeader style={{maxHeight: 550, width: 1000, tableLayout: 'auto', backgroundColor: '#001528', color: '#fafafa', marginLeft: '20px', borderBottom: '2px solid #fafafa'}} fixedHeader={true} size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" style={{borderRadius: '10px 0px 0px 0px', borderLeft: '3px solid #fafafa'}}></StyledTableCell>
            <StyledTableCell align="center" style={{paddingRight: '20px', width: '199px'}}>Name</StyledTableCell>
            <StyledTableCell align="center" style={{width: '75px', paddingRight: '30px'}}>G/D/#</StyledTableCell>
            <StyledTableCell align="center" style={{width: '75px', paddingRight: '30px'}}>Score</StyledTableCell>
            <StyledTableCell align="center" ><img style={{height: '75px', width: '75px'}} src={correct} alt=""/></StyledTableCell>
            <StyledTableCell align="center" ><img style={{height: '75px', width: '75px'}} src={partial} alt=""/></StyledTableCell>
            <StyledTableCell align="center" ><img style={{height: '75px', width: '75px'}} src={incorrect} alt=""/></StyledTableCell>
            <StyledTableCell align="center"  style={{width: '75px'}}>Total Time</StyledTableCell>
            <StyledTableCell align="center" style={{borderRadius: '0px 10px 0px 0px', borderRight: '3px solid #fafafa', paddingLeft: '35px', width: '75px'}}>Avg Time</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{overflowX: 'hidden', overflowY: 'scroll'}}>
          {scoresArray.map((row, index) => (
            <StyledTableRow key={index + 1}>
              <StyledTableCell align="center" style={{position: 'relative', width: '80px', borderLeft: '3px solid #fafafa'}}>
                { index >= 0 && index <=2 ?
                  <img src={whiteFlower} style={{height: '75px', width: '75px', backgroundColor: '#001528'}} alt=""/> : <img src=""/>
                }
                <div style={{maxHeight: '75px', maxWidth: '75px', borderRadius: '50%', position: 'absolute', left: '45%', top: '33%'}}>{index + 1}</div>
              </StyledTableCell>
              <StyledTableCell align="center" style={{overflow: 'scroll', minWidth: '200px', maxWidth: '200px'}}>{row.name}</StyledTableCell>
              <StyledTableCell align="center" style={{ display: 'flex', flexWrap: 'wrap', width: '120px'}}>
                <Tag color="#554cff" style={{ color: '#001528', fontSize: '14px', marginBottom: '5px'}}><b>{row.songNum}<img src={blackNote} style={{color: '#001528', width: '15px', height: '15px', paddingTop: '4px'}}/></b></Tag>
                <Tag color="#38b6ff" style={{ color: '#001528', fontSize: '14px'}}><b>{row.difficulty === 0 ? "Easy" : (row.difficulty === 1 ? "Medium" : "Hard")}</b></Tag>
                <Tag color="#1776ff" style={{ color: '#001528', fontSize: '14px', marginTop: '5px'}}><b>{row.genre === 0 ? "Random" : (row.genre === 1 ? "Pop" : "Rock")}</b></Tag>
              </StyledTableCell>
              <StyledTableCell align="center" style={{fontSize: 32, paddingRight: '30px'}}>{row.score}</StyledTableCell>
              <StyledTableCell align="center" style={{fontSize: 32}}>{row.correct}</StyledTableCell>
              <StyledTableCell align="center" style={{fontSize: 32}}>{row.partiallyCorrect}</StyledTableCell>
              <StyledTableCell align="center" style={{fontSize: 32}}>{row.incorrect}</StyledTableCell>
              <StyledTableCell align="center" style={{color: '1776ff'}}>{formatTime(row.time)}</StyledTableCell>
              <StyledTableCell align="center" style={{borderRight: '3px solid #fafafa', paddingLeft: '48px', paddingRight: '31px'}}>{formatTime(row.avg)}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        <div style={{display: 'inline-flex', justifyContent: 'center', alignItems: 'center', color: '#1776ff', backgroundColor: '#001528', position: 'absolute', zIndex: 2, height: '125px', bottom: '27px', marginLeft: '20px', borderBottom: 'solid #fafafa 3px', borderLeft: '3px solid #fafafa', borderRight: '3px solid #fafafa', paddingRight: '19px', borderRadius: '0px 0px 10px 10px', width: '1105px', borderTop: '3px solid #fafafa'}}>

        <StyledSelect
          defaultValue={'All # of Songs'}
          value={songNumValue}
          MenuProps={{
            PaperProps: {sx: {marginTop: '10px', "& li": {
              fontSize: 12,
          }, }}
          }}
          onChange={(event) => {
            setSongNumValue(event.target.value)
          }}>
          <MenuItem value={'All # of Songs'}>All # of Songs</MenuItem>
          <MenuItem value={10}>10 Songs</MenuItem>
          <MenuItem value={20}>20 Songs</MenuItem>
          <MenuItem value={30}>30 Songs</MenuItem>
        </StyledSelect>
        <StyledSelect
          defaultValue={'All Difficulties'}
          value={difficultyValue}
          MenuProps={{
            PaperProps: {sx: {marginTop: '10px', "& li": {
              fontSize: 12,
          }, }}
          }}
          onChange={(event) => {
            setDifficultyValue(event.target.value)
          }}>
          <MenuItem value={'All Difficulties'}>All Difficulties</MenuItem>
          <MenuItem value={'Easy'}>Easy</MenuItem>
          <MenuItem value={'Medium'}>Medium</MenuItem>
          <MenuItem value={'Hard'}>Hard</MenuItem>
        </StyledSelect>
        <StyledSelect
          defaultValue={'All Genres'}
          value={genreValue}
          MenuProps={{
            PaperProps: {sx: {marginTop: '10px', "& li": {
              fontSize: 12,
          }, }}
          }}
          onChange={(event) => {
            setGenreValue(event.target.value)
          }}>
          <MenuItem value={'All Genres'}>All Genres</MenuItem>
          <MenuItem value={'Random'}>Random</MenuItem>
          <MenuItem value={'Pop'}>Pop</MenuItem>
          <MenuItem value={'Rock'}>Alt/Rock</MenuItem>
        </StyledSelect>
        <Button style={{width: '75px', height: '50px', marginLeft: '20px'}}
          type="primary"
          onClick={(e) => {resetButtonClicked(e)}}
          >
            Reset
        </Button>

        </div>
      </div>
    </div>
  );
};

export default Leaderboard;