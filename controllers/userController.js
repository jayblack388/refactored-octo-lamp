const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.User.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.status(200).json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByEmail: (req, res) => {
    db.User.findOne({ email: req.params.email })
      .then(dbModel => res.status(200).json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: (req, res) => {
    db.User.findById(req.params.id)
      .then(dbModel => res.status(200).json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findLists: (req, res) => {
    const popObj = {
      path: 'lists',
    };
    if (req.params.withListItems) {
      popObj.populate = { path: 'data' };
    }
    db.User.findById(req.params.userId)
      .populate(popObj)
      .select('lists -_id')
      .then(dbLists => {
        res.status(200).json(dbLists);
      })
      .catch(err => res.status(422).json(err));
  },
};
