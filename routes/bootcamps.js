const express = require('express');
let router = express.Router();
// get the controller associated with the route
const { getBootcamps,
    getSingleBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius } = require('../controllers/bootcamps');

// Include other resources router
const coursesRouter = require('./courses');

// Re-route other resources
router.use('/:bootcampId/courses', coursesRouter);

router.route('/')
    .get(getBootcamps)
    .post(createBootcamp);

router.route('/:id')
    .get(getSingleBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);

router.route('/radius/:zipcode/:distance')
    .get(getBootcampsInRadius);

module.exports = router;
