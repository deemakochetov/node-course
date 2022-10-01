/* eslint-disable consistent-return */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const { log, logFailure, logSuccess } = require('./utils/logging');
const getWeather = require('./utils/weather');
const getGeocoding = require('./utils/geocoding');

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
const partialsPath = path.join(__dirname, '../views/partials');
const staticPath = path.join(__dirname, '../public');
app.set('view engine', 'hbs');
app.use(express.static(staticPath));

hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
  res.render('index');
});

app.post('/location', (req, res) => {
  const context = {};
  const { location, needGeocoding } = req.body;
  if (!location) return res.render('results', { error: 'Provide location' });

  getGeocoding(location, (err, data) => {
    if (err) return res.render('results', { error: err });

    const { latitude, longitude, label } = data;
    context.location = label;
    if (needGeocoding)
      context.exactLocation = `Your exact location - latitude: ${latitude}, longitude: ${longitude}`;
    getWeather(label, (errForecast, dataForecast) => {
      if (errForecast) return res.render('results', { error: errForecast });

      const { temperature, feelslike, weatherDescriptions } = dataForecast;
      let weatherDescription = `It's `;
      weatherDescriptions.forEach((description) => {
        weatherDescription += `${description},`;
      });
      weatherDescription = weatherDescription.slice(0, -1);
      context.weather = `${weatherDescription}. Current temperature is ${temperature} degrees Celcius. It feels like ${feelslike} degrees Celcius`;
      res.render('results', context);
    });
  });
});

app.get('/location', (req, res) => {
  res.render('getLocation');
});

app.listen(3000, () => {
  logSuccess('App is running on 3000 port');
});
