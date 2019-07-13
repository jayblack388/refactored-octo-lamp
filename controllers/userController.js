const db = require('../models');

module.exports = {
  // findAll: async (req, res) => {
  //   try {
  //     const dbModel = await db.User.find(req.query).sort({ date: -1 });
  //     return res.status(200).json(dbModel);
  //   } catch (err) {
  //     return res.status(422).json(err);
  //   }
  // },
  findByEmail: async (req, res) => {
    try {
      const dbModel = await db.User.findOne({ email: req.params.email });
      return res.status(200).json(dbModel);
    } catch (err) {
      return res.status(422).json(err);
    }
  },
  findById: async (req, res) => {
    try {
      const dbModel = await db.User.findById(req.params.id);
      return res.status(200).json(dbModel);
    } catch (err) {
      return res.status(422).json(err);
    }
  },
  findLists: async (req, res) => {
    const popObj = {
      path: 'lists',
    };
    if (req.params.withListItems) {
      popObj.populate = { path: 'data' };
    }
    try {
      const dbLists = await db.User.findById(req.params.userId)
        .populate(popObj)
        .select('lists')
        .sort({ dateCreated: -1 });
      res.status(200).json(dbLists);
    } catch (err) {
      return res.status(422).json(err);
    }
  },
};
