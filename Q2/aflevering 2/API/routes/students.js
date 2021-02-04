const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student_controller');
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
});

/* GET add student form */
router.post('/add', auth, studentController.addStudent);

/* GET users listing. */
router.get('/list', studentController.listStudents);

module.exports = router;
