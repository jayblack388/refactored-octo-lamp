const mongoose = require('mongoose');
const db = require('../models');
mongoose.Promise = global.Promise;

var MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/refactored-octo-lamp';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});

const dataSeed = [
  {
    name: 'John',
    email: 'jblackwell072588@gmail.com'
  },
  {
    name: 'Lindsay',
    email: 'jblackwell072588+lindsay@gmail.com'
  },
  {
    name: 'Leslie',
    email: 'jblackwell072588+leslie@gmail.com'
  },
  {
    name: 'Jack',
    email: 'jblackwell072588+jackb@gmail.com'
  },
  {
    name: 'Lee',
    email: 'jblackwell072588+lee@gmail.com'
  },
  {
    name: 'Barbara',
    email: 'jblackwell072588+barbara@gmail.com'
  },
  {
    name: 'David',
    email: 'jblackwell072588+david@gmail.com'
  },
  {
    name: 'Lara',
    email: 'jblackwell072588+lara@gmail.com'
  },
  {
    name: 'Liam',
    email: 'jblackwell072588+liam@gmail.com'
  },
  {
    name: 'Jack',
    email: 'jblackwell072588+jackc@gmail.com'
  },
  {
    name: 'George',
    email: 'jblackwell072588+george@gmail.com'
  }
];

db.Data.deleteMany({})
  .then(() => {
    db.Data.insertMany(dataSeed)
      .then(dataRes => {
        console.log(`${dataRes.length} Records added`);
        process.exit(0);
      })
      .catch(err => {
        console.error(err);
        process.exit(1);
      });
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
