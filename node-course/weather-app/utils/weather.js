const axios = require('axios').default;

require('dotenv').config();

const getWeather = (location, callback) => {
  const locationURL = encodeURIComponent(location);
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${locationURL}`;
  axios
    .get(url)
    .then((response) => {
      if (response.error) callback('Unable to find location', undefined);
      else {
        const { temperature, feelslike } = response.data.current;
        const weatherDescriptions = response.data.current.weather_descriptions;
        callback(undefined, { temperature, feelslike, weatherDescriptions });
      }
    })
    .catch(() => {
      callback('Unable to connect to weather api', undefined);
    });
};

module.exports = getWeather;
