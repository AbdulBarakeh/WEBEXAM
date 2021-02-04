const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
});

/* GET add workout form */
router.post('/add', auth, workoutController.createWorkout);

/* GET workout listing. */
router.get('/list', auth, workoutController.findWorkouts);

router.get('/listall', workoutController.findALLWorkouts);

module.exports = router;