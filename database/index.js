const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/melodyMastermind');

let schema = mongoose.Schema({
  name: String,
  difficulty: Number,
  genre: Number,
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
  if (entry.genre === "Random") {
    entry.genre = 0;
  } else if (entry.genre === "Pop") {
    entry.genre = 1;
  } else if (entry.genre === "Alt/Rock" || entry.genre === "Rock") {
    entry.genre = 2;
  }

  if (entry.difficulty === "Easy") {
    entry.difficulty = 0;
  } else if (entry.difficulty === "Medium") {
    entry.difficulty = 1;
  } else if (entry.difficulty === "Hard") {
    entry.difficulty = 2;
  }

  return Entry.create(entry);
}


const getAllByGenreDifficultySongNum = (genreValue, difficultyValue, songNumValue) => {

  if (genreValue === 'All Genres') {
    genreValue = undefined;
  } else if (genreValue === "Random") {
    genreValue = 0;
  } else if (genreValue === "Pop") {
    genreValue = 1;
  } else if (genreValue === "Alt/Rock" || genreValue === "Rock") {
    genreValue = 2;
  }

  if (difficultyValue === 'All Difficulties') {
    difficultyValue = undefined;
  } else if (difficultyValue === "Easy") {
    difficultyValue = 0;
  } else if (difficultyValue === "Medium") {
    difficultyValue = 1;
  } else if (difficultyValue === "Hard") {
    difficultyValue = 2;
  }

  if (songNumValue === 'All # of Songs') {
    songNumValue = undefined;
  }


  if (genreValue === undefined && difficultyValue === undefined && songNumValue === undefined) {
    // return Entry.find({genre: {$in:[ 0, 1, 2 ]}, difficulty: {$in:[ 0, 1, 2 ]}, songNum: {$in:[ 10, 20, 30 ]}}).sort({songNum: -1, difficulty: -1, genre: -1}).exec();
    // console.log('RESULT OF THAT: ', result);
    return Entry.find({}).sort({songNum: -1, difficulty: -1, genre: -1, score: -1}).exec();

    //return result;
  }

  if (genreValue !== undefined && difficultyValue === undefined && songNumValue === undefined) {
    console.log('GENREVALUE: ', genreValue);
    return Entry.find({genre: genreValue}).sort({songNum: -1, difficulty: -1, genre: -1, score: -1}).exec();
  }

  if (genreValue !== undefined && difficultyValue !== undefined && songNumValue === undefined) {
    return Entry.find({genre: genreValue, difficulty: difficultyValue, songNum: {$in:[ 10, 20, 30 ]}}).sort({songNum: -1, difficulty: -1, genre: -1, score: -1}).exec();
  }

  if (genreValue !== undefined && difficultyValue !== undefined && songNumValue !== undefined) {
    return Entry.find({genre: genreValue, difficulty: difficultyValue, songNum: songNumValue}).sort({songNum: -1, difficulty: -1, genre: -1, score: -1}).exec();
  }

  if (genreValue === undefined && difficultyValue !== undefined && songNumValue === undefined) {
    return Entry.find({genre: {$in:[ 0, 1, 2 ]}, difficulty: difficultyValue, songNum: {$in:[ 10, 20, 30 ]}}).sort({songNum: -1, difficulty: -1, genre: -1, score: -1}).exec();
  }

  if (genreValue === undefined && difficultyValue !== undefined && songNumValue !== undefined) {
    return Entry.find({genre: {$in:[ 0, 1, 2 ]}, difficulty: difficultyValue, songNum: songNumValue}).sort({songNum: -1, difficulty: -1, genre: -1, score: -1}).exec();
  }

  if (genreValue === undefined && difficultyValue === undefined && songNumValue !== undefined) {
    return Entry.find({genre: {$in:[ 0, 1, 2 ]}, difficulty: {$in:[ 0, 1, 2 ]}, songNum: songNumValue}).sort({songNum: -1, difficulty: -1, genre: -1, score: -1}).exec();
  }

  if (genreValue !== undefined && difficultyValue !== undefined && songNumValue !== undefined) {
    return Entry.find({genre: genreValue, difficulty: difficultyValue, songNum: songNumValue}).sort({songNum: -1, difficulty: -1, genre: -1, score: -1}).exec();
  }

  if (genreValue !== undefined && difficultyValue === undefined && songNumValue !== undefined) {
    return Entry.find({genre: genreValue, difficulty: {$in:[ 0, 1, 2 ]}, songNum: songNumValue}).sort({songNum: -1, difficulty: -1, genre: -1, score: -1}).exec();
  }
}


module.exports.save = save;
module.exports.getAllByGenreDifficultySongNum = getAllByGenreDifficultySongNum;
module.exports.Entry = Entry;