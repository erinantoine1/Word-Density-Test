const express = require('express');
const { save, getAllByGenreDifficultySongNum } = require('../database/index.js');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

app.post("/scores", (req, res) => {
  console.log(req.body);
  save(req.body).then((response)=> {
    res.sendStatus(201);
  });
});

app.get("/scores", (req, res) => {
  const genreValue = req.query.genreValue;
  const difficultyValue = req.query.difficultyValue;
  const songNumValue = req.query.songNumValue;
  // let newGenreValue, newDifficultyValue, newSongNumValue;

  // //   console.log('Genre: ', genreValue);
  // // console.log('Difficulty: ', difficultyValue);
  // // console.log('SongNum: ', songNumValue);

  // if (genreValue === 'All Genres') {
  //   newGenreValue = undefined;
  // }

  // if (difficultyValue === 'All Difficulties') {
  //   newDifficultyValue = undefined;
  // }

  // if (songNumValue === 'All # of Songs') {
  //   newSongNumValue = undefined;
  // }
  getAllByGenreDifficultySongNum(genreValue, difficultyValue, songNumValue)
  .then((data) => {
    console.log(data);
    res.send(data)
    })
})

app.listen(3000, (err) => {
  if (err) {
    console.log('There is no server at ', 3000);
  } else {
    console.log('Listening on Port ', 3000);
  }
});
