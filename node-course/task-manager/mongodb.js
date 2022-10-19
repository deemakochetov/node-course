const { MongoClient, ObjectId } = require('mongodb');
const { logFailure, logSuccess, log } = require('./utils/logging');

const CONNECTION_URL = 'mongodb://127.0.0.1:27017';
const DATABASE_NAME = 'task-manager';

MongoClient.connect(
  CONNECTION_URL,
  {
    useNewUrlParser: true
  },
  (error, client) => {
    if (error) {
      return logFailure('Unable to connect to database');
    }

    const db = client.db(DATABASE_NAME);
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
