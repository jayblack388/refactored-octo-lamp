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
  findAllLists: (req, res) => {
    const { id } = req.params;
    db.User.findById(id)
      .populate({
        path: 'lists',
        populate: { path: 'list' },
      })
      .then(dbModel => {
        console.log(dbModel);
        res.status(200).json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
};
