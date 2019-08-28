const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 1000000,
  })
);
app.use(bodyParser.json({ extended: true }));
app.use(logger('dev'));

app.use(express.static('client/build'));

app.use(routes);

mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/refactored-octo-lamp',
  {
    useNewUrlParser: true,
  }
);

app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
