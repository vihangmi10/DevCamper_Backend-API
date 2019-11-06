const express = require('express');
let router = express.Router();
// get the controller associated with the route
const { getBootcamps,
    getSingleBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp } = require('../controllers/bootcamps');

router.route('/')
    .get(getBootcamps)
    .post(createBootcamp);

router.route('/:id')
    .get(getSingleBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);


module.exports = router;
