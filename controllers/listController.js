const db = require('../models');

module.exports = {
  create: (req, res) => {
    const userId = req.params.userId;
    const body = {
      userId,
      title: req.body.title,
    };
    db.List.create(body)
      .then(dbList => {
        return db.User.findByIdAndUpdate(
          userId,
          {
            $push: { lists: dbList._id },
          },
          { new: true }
        )
          .populate('lists')
          .then(dbUser => {
            res.status(200).json(dbUser.lists);
          });
      })
      .catch(err => res.status(422).json(err));
  },
  read: (req, res) => {
    db.List.findById(req.params.listId)
      .populate('data')
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
      .then(() => {
        db.User.findById(req.params.userId)
          .populate('lists')
          .then(dbUser => {
            res.status(200).json(dbUser.lists);
          });
      })
      .catch(err => res.status(422).json(err));
  },
};
