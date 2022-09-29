const axios = require('axios').default;

require('dotenv').config();

const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=New`;
axios
  .get(url)
  .then((response) => {
    const currentTemp = response.data.current.temperature;
    const probabilityRain = response.data.current.precip;
    console.log(currentTemp, probabilityRain);
  })
  .catch((error) => {
    // handle error
    console.log(error);
  })
  .then(() => {
    // always executed
  });

// O
