const express = require('express');
const { log, logSuccess, logFailure } = require('./src/utils/logging');
require('./src/db/mongoose');
const usersRouter = require('./src/routes/users.routes');
const tasksRouter = require('./src/routes/tasks.routes');
const authRouter = require('./src/routes/auth.routes');

// if (process.env.NODE_ENV !== 'production') {
require('dotenv').config({ path: `${__dirname}/.env` });
// }

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

app.listen(port, () => {
  logSuccess(`Listening on port ${port}`);
});
