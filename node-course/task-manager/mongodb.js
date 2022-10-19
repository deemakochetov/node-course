const { MongoClient, ObjectId } = require('mongodb');
const { logFailure, logSuccess, log } = require('./utils/logging');

const connenctionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(
  connenctionURL,
  {
    useNewUrlParser: true
  },
  (error, client) => {
    if (error) {
      return logFailure('Unable to connect to database');
    }

    const db = client.db(databaseName);
    db.collection('users').insertOne(
      {
        name: 'Dima',
        age: 17
      },
      (error, result) => {
        if (error) {
          return logFailure('Unable to insert user');
        }
      }
    );
  }
);
