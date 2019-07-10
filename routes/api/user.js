const router = require('express').Router();
const userController = require('../../controllers/userController');
const listController = require('../../controllers/listController');
const listItemController = require('../../controllers/listItemController');

router.route('/').get(userController.findAll);
router.route('/:id/lists').get(userController.findAllLists);
router.route('/:email').get(userController.findByEmail);

module.exports = router;
