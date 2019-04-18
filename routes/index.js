const apiRoutes = require('./api');
const authRoutes = require('./auth');

const router = require('express').Router();

router.use('/api', apiRoutes);
router.use('/auth', authRoutes);

module.exports = router;
