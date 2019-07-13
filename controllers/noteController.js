const db = require('../models');

module.exports = {
  create: async (req, res) => {
    const listItemId = req.params.listItemId;
    const body = {
      listItemId,
      text: req.body.text,
    };
    try {
      const dbNote = await db.Note.create(body);
      try {
        const dbListItem = await db.ListItem.findByIdAndUpdate(listItemId, {
          $push: { notes: dbNote._id },
        }, { new: true })
          .populate('notes');
        res.status(200).json({ listItem: dbListItem, note: dbNote });
      }
      catch (err) {
        return res.status(404).json(err);
      }
    }
    catch (err_1) {
      return res.status(404).json(err_1);
    }
  },
  read: async (req, res) => {
    try {
      const dbNote = await db.Note.findById(req.params.noteId);
      return res.status(200).json(dbNote);
    }
    catch (err) {
      return res.status(404).json(err);
    }
  },
  update: async (req, res) => {
    try {
      const dbNote = await db.Note.findByIdAndUpdate(req.params.noteId, req.body);
      try {
        const dbListItem = await db.ListItem.findById(req.params.listItemId)
          .populate('notes');
        res.status(200).json({ listItem: dbListItem, note: dbNote });
      }
      catch (err) {
        return res.status(404).json(err);
      }
    }
    catch (err_1) {
      return res.status(404).json(err_1);
    }
  },
  delete: async (req, res) => {
    try {
      await db.Note.findByIdAndDelete(req.params.noteId);
      try {
        const dbListItem = await db.ListItem.findById(req.params.listItemId)
          .populate('notes');
        res.status(200).json({ listItem: dbListItem });
      }
      catch (err) {
        return res.status(404).json(err);
      }
    }
    catch (err_1) {
      return res.status(404).json(err_1);
    }
  },
};
