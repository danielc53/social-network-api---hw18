const router = require('express').Router();
const {
    getSingleThought,
    getThought,
    createThought,
    addReaction,
} = require('../../controllers/thoughtControllers');

router.route('/').get(getThought).post(createThought);

router.route('/:thoughtId/reaction').post(addReaction);

router.route('/:thoughtId').get(getSingleThought);

module.exports = router;