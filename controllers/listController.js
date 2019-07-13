const db = require('../models');

module.exports = {
  create: async (req, res) => {
    const userId = req.params.userId;
    const body = {
      userId,
      title: req.body.title,
    };
    try {
      const dbList = await db.List.create(body);
      try {
        const dbUser = await db.User.findByIdAndUpdate(
          userId,
          {
            $push: { lists: { $each: [dbList._id], $position: 0 } },
          },
          { new: true }
        ).populate('lists');
        res.status(200).json({ lists: dbUser.lists, list: dbList });
      } catch (err) {
        return res.status(404).json(err);
      }
    } catch (err_1) {
      return res.status(404).json(err_1);
    }
  },
  read: async (req, res) => {
    try {
      const dbList = await db.List.findById(req.params.listId).populate('data');
      try {
        const dbUser = await db.User.findById(req.params.userId)
          .populate({ path: 'lists', populate: { path: 'data' } })
          .select('lists');
        res.status(200).json({ list: dbList, lists: dbUser.lists });
      } catch (err) {
        return res.status(404).json(err);
      }
    } catch (err_1) {
      return res.status(404).json(err_1);
    }
  },
  update: async (req, res) => {
    try {
      const dbList = await db.List.findByIdAndUpdate(
        req.params.listId,
        req.body
      );
      try {
        const dbUser = await db.User.findById(req.params.userId)
          .populate({ path: 'lists', populate: { path: 'data' } })
          .select('lists');
        res.status(200).json({ list: dbList, lists: dbUser.lists });
      } catch (err) {
        return res.status(404).json(err);
      }
    } catch (err_1) {
      return res.status(404).json(err_1);
    }
  },
  delete: async (req, res) => {
    try {
      await db.List.findByIdAndDelete(req.params.listId);
      try {
        const dbUser = await db.User.findById(req.params.userId).populate(
          'lists'
        );
        res.status(200).json({ list: {}, lists: dbUser.lists });
      } catch (err) {
        return res.status(404).json(err);
      }
    } catch (err_1) {
      return res.status(404).json(err_1);
    }
  },
};
