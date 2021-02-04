
const mongoose = require('mongoose');
const studentsColl = mongoose.model('Student');

module.exports.addStudent = async function (req, res) {
    let student = await studentsColl.create({
        name: req.body.name,
        grade: req.body.grade,
    }).catch(reason =>
        res.status(400).json({
            "title": "Unable to create student record",
            "detail": reason
        })
    );
    if (student)  // The student was succesfully added to the collection
        res.status(201).json({
            "title": "Created",
            student
        })
    else {
        res.status(500).json({
            "title": "Unknown server error"
        })
    };
};

/* GET list of students */
module.exports.listStudents = async function (req, res) {
    const students = await studentsColl.find({})
    .catch(reason =>
        res.status(400).json({
            "title": "Unable to read students from the database",
            "detail": reason
        })
    );
    res.status(200).json({
        students
    })
};