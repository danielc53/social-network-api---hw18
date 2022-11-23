const router = require('express').Router();
const userRoutes = require('./userRoute');
const thoughtRoutes = require('./thoughtRoute');

router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;