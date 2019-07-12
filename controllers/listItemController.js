const db = require('../models');

const parseJsonAsync = jsonString => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(JSON.parse(jsonString));
    });
  });
};

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
            res.status(200).json({ list: dbList, listItem: dbListItem });
          });
      })
      .catch(err => res.status(404).json(err));
  },
  read: (req, res) => {
    db.List.findById(req.params.listId)
      .populate('data')
      .then(dbList => {
        return db.listItem
          .findById(req.params.listItemId)
          .then(dbListItem => {
            res.status(200).json({ list: dbList, listItem: dbListItem });
          })
          .catch(err => res.status(404).json(err));
      })
      .catch(err => res.status(404).json(err));
  },
  update: (req, res) => {
    db.ListItem.findByIdAndUpdate(req.params.listItemId, req.body)
      .then(dbListItem => {
        db.List.findById(req.params.listId)
          .populate('data')
          .then(dbList => {
            res.status(200).json({ list: dbList, listItem: dbListItem });
          })
          .catch(err => res.status(404).json(err));
      })
      .catch(err => res.status(404).json(err));
  },
  delete: (req, res) => {
    db.ListItem.findByIdAndDelete(req.params.listItemId)
      .then(() => {
        db.List.findById(req.params.listId)
          .populate('data')
          .then(dbList => {
            res.status(200).json({ list: dbList, listItem: {} });
          })
          .catch(err => res.status(404).json(err));
      })
      .catch(err => res.status(404).json(err));
  },
};
