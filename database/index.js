const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/melodyMastermind');

let schema = mongoose.Schema({
  name: String,
  difficulty: String,
  genre: String,
  songNum: Number,
  score: Number,
  correct: Number,
  partiallyCorrect: Number,
  incorrect: Number,
  time: String,
  avg: String,
});

let Entry = mongoose.model('Scores', schema);


let save = (entry) => {
  return Entry.create(entry);
}


const getAllByGenreDifficultySongNum = (genreValue, difficultyValue, songNumValue) => {


  console.log('Genre: ', genreValue);
  console.log('Difficulty: ', difficultyValue);
  console.log('SongNum: ', songNumValue);
  // let genreDbValue, difficultyDbValue, songNumDbValue;

  // if (genreValue === undefined) {
  //   genreDbValue = `${{$in:[ 'Random', 'Pop', 'Rock' ]}}`
  // }

  // if (difficultyValue === undefined) {
  //   difficultyDbValue = `${{$in:[ 'Easy', 'Medium', 'Hard' ]}}`
  // }

  // if (songNumValue === undefined) {
  //   songNumDbValue = `${{$in:[ 10, 20, 30]}}`
  // }

  // console.log('Genre: ', genreDbValue);
  // console.log('Difficulty: ', difficultyDbValue);
  // console.log('SongNum: ', songNumDbValue);



  //return Entry.find({genre: genreValue, difficulty: difficultyValue, songNum: Number(songNumValue)});

  if (genreValue === undefined && difficultyValue === undefined && songNumValue === undefined) {
    return Entry.find({genre: {$in:[ 'Random', 'Pop', 'Rock' ]}, difficulty: {$in:[ 'Easy', 'Medium', 'Hard' ]}, songNum: {$in:[ 10, 20, 30 ]}});
  }

  if (genreValue !== undefined && difficultyValue === undefined && songNumValue === undefined) {
    return Entry.find({genre: genreValue, difficulty: {$in:[ 'Easy', 'Medium', 'Hard' ]}, songNum: {$in:[ 10, 20, 30 ]}});
  }

  if (genreValue !== undefined && difficultyValue !== undefined && songNumValue === undefined) {
    return Entry.find({genre: genreValue, difficulty: difficultyValue, songNum: {$in:[ 10, 20, 30 ]}});
  }

  if (genreValue !== undefined && difficultyValue !== undefined && songNumValue !== undefined) {
    return Entry.find({genre: genreValue, difficulty: difficultyValue, songNum: songNumValue});
  }

  if (genreValue === undefined && difficultyValue !== undefined && songNumValue === undefined) {
    return Entry.find({genre: {$in:[ 'Random', 'Pop', 'Rock' ]}, difficulty: difficultyValue, songNum: {$in:[ 10, 20, 30 ]}});
  }

  if (genreValue === undefined && difficultyValue !== undefined && songNumValue !== undefined) {
    return Entry.find({genre: {$in:[ 'Random', 'Pop', 'Rock' ]}, difficulty: difficultyValue, songNum: {$in:[ 10, 20, 30 ]}});
  }

  if (genreValue === undefined && difficultyValue === undefined && songNumValue !== undefined) {
    return Entry.find({genre: {$in:[ 'Random', 'Pop', 'Rock' ]}, difficulty: {$in:[ 'Easy', 'Medium', 'Hard' ]}, songNum: songNumValue});
  }

  if (genreValue !== undefined && difficultyValue !== undefined && songNumValue !== undefined) {
    return Entry.find({genre: genreValue, difficulty: difficultyValue, songNum: songNumValue});
  }

  if (genreValue !== undefined && difficultyValue === undefined && songNumValue !== undefined) {
    return Entry.find({genre: genreValue, difficulty: {$in:[ 'Easy', 'Medium', 'Hard' ]}, songNum: songNumValue});
  }
}


module.exports.save = save;
module.exports.getAllByGenreDifficultySongNum = getAllByGenreDifficultySongNum;
module.exports.Entry = Entry;