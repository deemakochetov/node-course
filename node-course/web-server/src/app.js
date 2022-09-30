const express = require('express');
const { log, logFailure, logSuccess } = require('./utils/logging');

const app = express();

app.get('', (req, res) => {
  res.send('App response');
});

app.listen(3000, () => {
  logSuccess('App is running on 3000 port');
});
