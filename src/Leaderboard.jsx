import React, { useState, useEffect } from 'react';
import { Button, Radio, Tooltip, ConfigProvider, Tabs, Textfield, Select} from 'antd';
import axios from 'axios';
import {
  InfoCircleOutlined, LeftCircleOutlined, FilterOutlined
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

const Leaderboard = (props) => {

   const [scoresArray, setScoresArray] = useState([]);
  const [size, setSize] = useState('large');
  const TabPane = Tabs.TabPane;
  const [genreValue, setGenreValue] = useState(undefined);
  const [difficultyValue, setDifficultyValue] = useState(undefined);
  const [songNumValue, setSongNumValue] = useState(undefined);

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
    props.setMainMenuVisible(true);
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#001528',
      color: '#fafafa',
      fontSize: 18
    },
    [`&.${tableCellClasses.body}`]: {
      color: '#fafafa',
      backgroundColor: '#001528',
      overflow: 'scroll',
      fontSize: 22
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


  const resetButtonClicked = (e) => {
    e.preventDefault();
    setDifficultyValue(null);
    setGenreValue(null);
    setSongNumValue(null);
  };

  useEffect(()=> {
    const newObj = {
      genreValue: genreValue,
      difficultyValue: difficultyValue,
      songNumValue: songNumValue
    }
    //console.log('# of Songs: ', songNumValue, '  Difficulty: ', difficultyValue, '  Genre: ', genreValue);
    axios.get('http://localhost:3000/scores', {params: newObj})
    .then((response) => {
      console.log('Response for Client: ', response.data);
      setScoresArray(response.data);
    }).catch((error) => {
      console.log(error);
    })
  }, [songNumValue, difficultyValue, genreValue])

  return (
    <div style={{backgroundColor: '#001528', height: '500px', width: '700px', padding: '5px', borderRadius: '10px'}}>
      <div style={{border: 'dashed #1776ff 3px', height: '488px', width: '688px', padding: '5px', borderRadius: '10px'}}>
        <div style={{display: 'inline-flex', justifyContent: 'space-between', width: '100%', padding: '10px'}}>
          <Button style={{fontSize: '40px', backgroundColor: '#001528', borderRadius: '50%', height: '40px', width: '40px'}} onClick={(e) => {goToMainMenu(e)}}>
            <LeftCircleOutlined style={{fontSize: '40px', color: '#fafafa', borderRadius: '50%', height: '40px', width: '40px', marginLeft: '-15px', marginTop: '-5px'}}/>
          </Button>
          <Tooltip title="How to Play" placement='right' color='red' key='red'>
            <InfoCircleOutlined style={{fontSize: '40px', color: '#fafafa'}}/>
          </Tooltip>
        </div>
      </div>
      <div style={{fontSize: '60', margin: '10px', color: '#1776ff', backgroundColor: '#001528', marginTop: '-70%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>Leaderboard</div>
      <div style={{marginTop: '-15px'}}>
      <TableContainer style={{height: 360, width: 670}} >
      <Table stickyHeader style={{height: 360, width: 670, tableLayout: 'auto', backgroundColor: '#001528', color: '#fafafa', marginLeft: '15px', overflowX: 'hidden', overflowY: 'scroll', borderBottom: '2px solid #fafafa'}} fixedHeader={true} size="small">
        <TableHead style={{borderBottom: '2px solid #fafafa', paddingTop: '50px'}}>
          <TableRow>
            <StyledTableCell align="center" ></StyledTableCell>
            <StyledTableCell align="center" style={{maxWidth: '90px'}}>Name</StyledTableCell>
            <StyledTableCell align="center" style={{fontSize: 18, paddingLeft: '25px'}}>G/D/#</StyledTableCell>
            <StyledTableCell align="center" style={{fontSize: 18}}>Score</StyledTableCell>
            <StyledTableCell align="center" style={{paddingBottom: '15px'}}><img style={{height: '40px', width: '40px'}} src={correct} alt=""/></StyledTableCell>
            <StyledTableCell align="center" style={{paddingBottom: '15px'}}><img style={{height: '40px', width: '40px'}} src={partial} alt=""/></StyledTableCell>
            <StyledTableCell align="center" style={{paddingBottom: '15px'}}><img style={{height: '40px', width: '40px'}} src={incorrect} alt=""/></StyledTableCell>
            <StyledTableCell align="center" style={{paddingBottom: '15px'}}>Total Time</StyledTableCell>
            <StyledTableCell align="center" style={{paddingBottom: '15px', paddingRight: '20px'}}>Avg Time</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scoresArray.map((row, index) => (
            <StyledTableRow key={index + 1} style={{borderBottom: '1px solid #fafafa', height: '70px'}}>
              <StyledTableCell align="center" style={{borderRight: '1px solid #fafafa', fontSize: 28}}>{index + 1}</StyledTableCell>
              <StyledTableCell align="center" style={{overflow: 'scroll', fontSize: '14px', maxWidth: '90px', marginRight: '10px'}}>{row.name}</StyledTableCell>
              <StyledTableCell align="center" style={{ display: 'flex', fontSize: '14px', borderBottom: 'solid #fafafa 1px'}}>
                {row.difficulty}
              </StyledTableCell>
              <StyledTableCell align="center" style={{ display: 'flex', fontSize: '14px', borderBottom: 'solid #fafafa 1px'}}>{row.genre}</StyledTableCell>
              <StyledTableCell align="center" style={{display: 'flex', fontSize: '14px', width: '105%'}}>{row.songNum} Songs</StyledTableCell>
              <StyledTableCell align="center" style={{fontSize: 28}}>{row.score}</StyledTableCell>
              <StyledTableCell align="center" style={{fontSize: 28}}>{row.correct}</StyledTableCell>
              <StyledTableCell align="center" style={{fontSize: 28}}>{row.partiallyCorrect}</StyledTableCell>
              <StyledTableCell align="center" style={{fontSize: 28}}>{row.incorrect}</StyledTableCell>
              <StyledTableCell align="center" style={{fontSize: '14px'}}>{row.time}</StyledTableCell>
              <StyledTableCell align="center" style={{fontSize: '14px'}}>10:06</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        <div style={{display: 'inline-flex', justifyContent: 'flex-end', alignItems: 'center', color: '#fafafa', marginTop: '5px'}}>
          <div style={{display: 'flex', flexWrap: 'wrap', fontSize: '14px', marginLeft: '27px'}}>
          </div>
        <Select
          defaultValue={null}
          value={genreValue}
          style={{
            width: 180,
            height: 50,
            marginLeft: '-7px',
          }}
          size="large"
          onChange={(value) => {
            setGenreValue(value)
          }}
          options={[
            {
              value: null,
              label: 'Any Genre',
            },
            {
              value: 'Random',
              label: 'Random',
            },
            {
              value: 'Pop',
              label: 'Pop',
            },
            {
              value: 'Alt/Rock',
              label: 'Alt/Rock',
            },
          ]}
        />
        <Select
          defaultValue={null}
          value={difficultyValue}
          style={{
            width: 180,
            height: 50,
            marginLeft: '10px'
          }}
          size="large"
          onChange={(value) => {
            setDifficultyValue(value)
          }}
          options={[
            {
              value: null,
              label: 'Any Difficulty',
            },
            {
              value: 'Easy',
              label: 'Easy',
            },
            {
              value: 'Medium',
              label: 'Medium',
            },
            {
              value: 'Hard',
              label: 'Hard',
            },
          ]}
        />
        <Select
          defaultValue ={null}
          value={songNumValue}
          style={{
            width: 180,
            height: 50,
            marginLeft: '10px'
          }}
          size="large"
          onChange={(value) => {
            setSongNumValue(value)
          }}
          options={[
            {
              value: null,
              label: 'Any # of Songs',
            },
            {
              value: 10,
              label: '10 Songs',
            },
            {
              value: 20,
              label: '20 Songs',
            },
            {
              value: 30,
              label: '30 Songs',
            },
          ]}
        />
        <Button style={{width: '75px', height: '40px', marginLeft: '10px', marginTop: '-10px'}}
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