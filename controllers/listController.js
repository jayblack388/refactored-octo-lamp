const db = require('../models');

module.exports = {
  create: (req, res) => {
    const userId = req.params.userId;
    const body = {
      userId,
      name: req.body.name,
    };
    db.List.create(body)
      .then(dbList => {
        return db.User.findByIdAndUpdate(userId, {
          $push: { lists: dbList._id },
        })
          .populate('list')
          .then(dbUser => {
            res.status(200).json({ list: dbList, user: dbUser });
          });
      })
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
