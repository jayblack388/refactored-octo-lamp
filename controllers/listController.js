const db = require('../models');

module.exports = {
  create: (req, res) => {
    db.List.create(req.body)
      .then(dbModel => res.status(200).json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  read: (req, res) => {
    db.List.findById(req.body.id)
      .then(dbModel => res.status(200).json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: (req, res) => {
    db.List.findByIdAndUpdate(req.params.listId, req.body)
      .then(dbModel => res.status(200).json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  delete: (req, res) => {
    db.List.findByIdAndDelete(req.params.listId)
      .then(() => res.status(200).json({}))
      .catch(err => res.status(422).json(err));
  },
};
