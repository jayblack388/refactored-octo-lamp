const router = require("express").Router();
const dataController = require('../../controllers/dataController');

router.route('/')
  .get(dataController.findAll)

  module.exports = router;