const getWeather = require('./utils/weather');
const getGeocoding = require('./utils/geocoding');
const logUtils = require('./utils/logging');

const { logFailure, logSuccess, log } = logUtils;

const loc = process.argv[2];
if (!loc) logFailure('Provide location');
else {
  getGeocoding(loc, (err, data) => {
    if (err) logFailure(err);
    else {
      const { latitude, longitude, label } = data;
      log(`Your location is ${label}`);
      logSuccess(
        `Your exact location - latitude: ${latitude}, longitude: ${longitude}`
      );
      getWeather(label, (errForecst, dataForecast) => {
        if (errForecst) logFailure(errForecst);
        else {
          const { temperature, feelslike, weatherDescriptions } = dataForecast;
          let weatherDescription = `It's `;
          weatherDescriptions.forEach((description) => {
            weatherDescription += `${description},`;
          });
          weatherDescription = weatherDescription.slice(0, -1);
          logSuccess(weatherDescription);
          logSuccess(
            `Current temperature is ${temperature} degrees Celcius. It feels like ${feelslike} degrees Celcius`
          );
        }
      });
    }
  });
}
