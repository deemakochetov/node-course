const express = require('express');
const path = require('path');
const hbs = require('hbs');
const { log, logFailure, logSuccess } = require('./utils/logging');

const app = express();

const partialsPath = path.join(__dirname, '../views/partials');
const staticPath = path.join(__dirname, '../public');
app.set('view engine', 'hbs');
app.use(express.static(staticPath));

hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
  res.send('App response');
});

app.listen(3000, () => {
  logSuccess('App is running on 3000 port');
});
