const db = require('../models');

module.exports = {
  create: (req, res) => {
    const listItemId = req.params.listItemId;
    const body = {
      listItemId,
      text: req.body.text,
    };
    db.Note.create(body)
      .then(dbNote => {
        return db.ListItem.findByIdAndUpdate(
          listItemId,
          {
            $push: { notes: dbNote._id },
          },
          { new: true }
        )
          .populate('notes')
          .then(dbListItem => {
            res.status(200).json({ listItem: dbListItem, note: dbNote });
          })
          .catch(err => res.status(404).json(err));
      })
      .catch(err => res.status(422).json(err));
  },
  read: (req, res) => {
    db.Note.findById(req.params.noteId)
      .then(dbNote => res.status(200).json(dbNote))
      .catch(err => res.status(422).json(err));
  },
  update: (req, res) => {
    db.Note.findByIdAndUpdate(req.params.noteId, req.body)
      .then(dbNote => {
        return db.ListItem.findById(req.params.listItemId)
          .populate('notes')
          .then(dbListItem => {
            res.status(200).json({ listItem: dbListItem, note: dbNote });
          })
          .catch(err => res.status(404).json(err));
      })
      .catch(err => res.status(422).json(err));
  },
  delete: (req, res) => {
    db.Note.findByIdAndDelete(req.params.noteId)
      .then(() => {
        return db.ListItem.findById(req.params.listItemId)
          .populate('notes')
          .then(dbListItem => {
            res.status(200).json({ listItem: dbListItem });
          })
          .catch(err => res.status(404).json(err));
      })
      .catch(err => res.status(422).json(err));
  },
};
