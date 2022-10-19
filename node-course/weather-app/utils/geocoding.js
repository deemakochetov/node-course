const axios = require('axios').default;

require('dotenv').config();

const getGeocoding = (loc, callback) => {
  const locationURL = encodeURIComponent(loc);
  const url = `http://api.positionstack.com/v1/forward?access_key=${process.env.POSITIONSTACK_API_KEY}&query=${locationURL}`;
  axios
    .get(url)
    .then((response) => {
      if (response.error) callback('Unable to find location', undefined);
      else {
        const { latitude, longitude, label } = response.data.data[0];
        callback(undefined, { latitude, longitude, label });
      }
    })
    .catch(() => {
      callback('Unable to connect to location services', undefined);
    })
    .then(() => {
      // always executed
    });
};
module.exports = getGeocoding;
