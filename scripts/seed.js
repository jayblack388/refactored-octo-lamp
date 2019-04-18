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
    name: 'John'
  },
  {
    name: 'Lindsay'
  },
  {
    name: 'Leslie'
  },
  {
    name: 'Jack'
  },
  {
    name: 'Lee'
  },
  {
    name: 'Barbara'
  },
  {
    name: 'David'
  },
  {
    name: 'Lara'
  },
  {
    name: 'Liam'
  },
  {
    name: 'Jack'
  },
  {
    name: 'George'
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
