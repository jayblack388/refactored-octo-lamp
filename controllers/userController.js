const db = require('../models');

module.exports = {
  findByEmail: (req, res) => {
    db.User.findOne({ email: req.params.email })
      .then(dbModel => res.status(200).json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};
