const mongoose = require('mongoose');
const config = require('config');

const CONNECTION_URL = config.get('dbConfig.connnection_url');

mongoose.connect(CONNECTION_URL, {});
