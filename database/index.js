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

  if (genreValue === 'All Genres') {
    genreValue = undefined;
  }

  if (difficultyValue === 'All Difficulties') {
    difficultyValue = undefined;
  }

  if (songNumValue === 'All # of Songs') {
    songNumValue = undefined;
  } else {
    songNumValue = songNumValue;
  }


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