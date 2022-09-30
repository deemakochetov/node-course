const express = require('express');
const path = require('path');
const { log, logFailure, logSuccess } = require('./utils/logging');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
  res.send('App response');
});

app.listen(3000, () => {
  logSuccess('App is running on 3000 port');
});
