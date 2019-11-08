const express = require('express');
let router = express.Router({ mergeParams: true });
const { getCourses,
        getSingleCourse,
        addCourses,
        updateCourses,
        deleteCourses
      }   = require('../controllers/courses');

router.route('/')
    .get(getCourses)
    .post(addCourses);

router.route('/:id')
    .get(getSingleCourse)
    .put(updateCourses)
    .delete(deleteCourses);

module.exports = router;
