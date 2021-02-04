const express = require('express');
const router = express.Router();
const excerciseController = require('../controllers/exerciesController');
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
});
/* POST exercies listing. */
router.post('/add', auth, excerciseController.createExercise);

/* GET exercies listing. */
router.get('/list', excerciseController.getAllWorkouts);

/* GET exercies ALL listings. */
router.get('/listall', excerciseController.getAllExcercies);

module.exports = router;