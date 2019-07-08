const router = require('express').Router();
const userController = require('../../controllers/userController');

router.route('/').get(userController.findAll);
router.route('/:email').get(userController.findByEmail);

module.exports = router;
