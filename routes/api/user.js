const router = require('express').Router();
const listController = require('../../controllers/listController');
const listItemController = require('../../controllers/listItemController');
const noteController = require('../../controllers/noteController');
const userController = require('../../controllers/userController');

// router.route('/').get(userController.findAll);
router.route('/:id').get(userController.findById);
router.route('/:email').get(userController.findByEmail);

router.route('/:userId/list').post(listController.create);
router.route('/:userId/lists/:withListItems?').get(userController.findLists);

router
  .route('/:userId/list/:listId')
  .get(listController.read)
  .put(listController.update)
  .delete(listController.delete);

router
  .route('/:userId/list/:listId/:listItemId?')
  .post(listItemController.create)
  .get(listItemController.read)
  .put(listItemController.update)
  .delete(listItemController.delete);

router
  .route('/:userId/list/:listId/:listItemId/note/:noteId?')
  .post(noteController.create)
  .get(noteController.read)
  .put(noteController.update)
  .delete(noteController.delete);

module.exports = router;