const db = require('../models');

module.exports = {
  create: async (req, res) => {
    const listId = req.params.listId;
    const body = {
      listId,
      title: req.body.title,
    };
    const dbListItem = await db.ListItem.create(body);
    try {
      const dbList = await db.List.findByIdAndUpdate(
        listId,
        {
          $push: { data: dbListItem._id },
        },
        { new: true }
      ).populate('data');
      res.status(200).json({ list: dbList, listItem: dbListItem });
    } catch (err) {
      res.status(404).json(err);
    }
  },
  read: async (req, res) => {
    try {
      const dbListItem = await db.ListItem.findById(
        req.params.listItemId
      ).populate('notes');
      try {
        const dbList = await db.List.findById(req.params.listId).populate(
          'data'
        );
        res.status(200).json({ list: dbList, listItem: dbListItem });
      } catch (err) {
        return res.status(404).json(err);
      }
    } catch (err_1) {
      return res.status(404).json(err_1);
    }
  },
  update: async (req, res) => {
    try {
      const dbListItem = await db.ListItem.findByIdAndUpdate(
        req.params.listItemId,
        req.body
      );
      try {
        const dbList = await db.List.findById(req.params.listId).populate(
          'data'
        );
        res.status(200).json({ list: dbList, listItem: dbListItem });
      } catch (err) {
        return res.status(404).json(err);
      }
    } catch (err_1) {
      return res.status(404).json(err_1);
    }
  },
  delete: async (req, res) => {
    try {
      await db.ListItem.findByIdAndDelete(req.params.listItemId);
      try {
        const dbList = await db.List.findById(req.params.listId).populate(
          'data'
        );
        res.status(200).json({ list: dbList, listItem: {} });
      } catch (err) {
        return res.status(404).json(err);
      }
    } catch (err_1) {
      return res.status(404).json(err_1);
    }
  },
};
