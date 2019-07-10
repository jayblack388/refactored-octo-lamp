const db = require('../models');

module.exports = {
  create: (req, res) => {
    const listId = req.params.listId;
    const body = {
      listId,
      title: req.body.title,
    };
    db.ListItem.create(body)
      .then(dbListItem => {
        return db.List.findByIdAndUpdate(
          listId,
          {
            $push: { data: dbListItem._id },
          },
          { new: true }
        )
          .populate('data')
          .then(dbList => {
            res.status(200).json(dbList);
          });
      })
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
