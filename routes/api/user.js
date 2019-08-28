const router = require('express').Router();
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const { cloudinary: config } = require('../../keys');
const listController = require('../../controllers/listController');
const listItemController = require('../../controllers/listItemController');
const noteController = require('../../controllers/noteController');
const userController = require('../../controllers/userController');
const fileController = require('../../controllers/fileController');

cloudinary.config({
  cloud_name: config.cloud,
  api_key: config.key,
  api_secret: config.secret,
});
const storage = cloudinaryStorage({
  cloudinary,
  folder: 'refactored-octo-lamp',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }],
});
const parser = multer({ storage: storage });

// router.route('/').get(userController.findAll);
router.route('/:id').get(userController.findById);
router.route('/:email').get(userController.findByEmail);

router.route('/:userId/lists/:withListItems?').get(userController.findLists);
router
  .route('/:userId/files')
  .post(parser.single('test-image'), fileController.create);

router
  .route('/:userId/list/:listId?')
  .post(listController.create)
  .get(listController.read)
  .put(listController.update)
  .delete(listController.delete);

router
  .route('/:userId/list/:listId/listItem/:listItemId?')
  .post(listItemController.create)
  .get(listItemController.read)
  .put(listItemController.update)
  .delete(listItemController.delete);

router
  .route('/:userId/list/:listId/listItem/:listItemId/note/:noteId?')
  .post(noteController.create)
  .get(noteController.read)
  .put(noteController.update)
  .delete(noteController.delete);

module.exports = router;
