const db = require('../models');

module.exports = {
  create: async (req, res) => {
    const { userId } = req.params;
    const image = {
      userId,
    };
    image.dateCreated = req.file.created_at;
    image.fileName = req.file.originalname;
    image.url = req.file.secure_url;
    image._id = req.file.public_id;
    try {
      const dbFile = await db.File.create(image);
      res.status(200).json(dbFile);
    }
    catch (err) {
      return res.status(400).json(err);
    }
  },
  read: async (req, res) => {},
  update: async (req, res) => {},
  delete: async (req, res) => {},
};
