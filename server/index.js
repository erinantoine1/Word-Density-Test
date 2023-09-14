const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const routes = require('./routes');

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

app.use(cors());
app.use('/', routes);

app.listen(3000, (err) => {
  if (err) {
    console.log('There is no server at ', 3000);
  } else {
    console.log('Listening on Port ', 3000);
  }
});
