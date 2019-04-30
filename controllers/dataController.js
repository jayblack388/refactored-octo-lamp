const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.Data.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByEmail: (req, res) => {
    db.Data.find({ email: req.params.email })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
