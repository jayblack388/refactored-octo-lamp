const db = require('../models');

module.exports = {
  create: (req, res) => {
    db.ListItem.create(req.body)
      .then(dbModel => res.status(200).json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  read: (req, res) => {
    db.ListItem.findById(req.body.id)
      .then(dbModel => res.status(200).json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: (req, res) => {
    db.ListItem.findByIdAndUpdate(req.params.itemId, req.body)
      .then(dbModel => res.status(200).json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  delete: (req, res) => {
    db.ListItem.findByIdAndDelete(req.params.itemId)
      .then(() => res.status(200).json({}))
      .catch(err => res.status(422).json(err));
  },
};
