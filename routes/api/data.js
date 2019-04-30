const router = require('express').Router();
const dataController = require('../../controllers/dataController');

router.route('/').get(dataController.findAll);
router.route('/:email').get(dataController.findByEmail);

module.exports = router;
