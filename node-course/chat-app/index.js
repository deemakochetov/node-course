const express = require('express');
const { log, logSuccess, logFailure } = require('./src/utils/logging');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
  logSuccess(`Listening on port ${port}`);
});
