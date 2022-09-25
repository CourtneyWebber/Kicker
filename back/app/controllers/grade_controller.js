 const Grade = require("../models/grade_model");

// Retrieve all grades from the database.
exports.findAll = (req, res) => {
    Grade.findAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while getting the grades."
            });
        else res.send(data);
    });
};

// Retrieve id for a selected grade
exports.getId = (req, res) => {
    Grade.getId(req.query.grade_name, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while getting the grade id."
            });
        else res.send(data);
    });
};

// Updates the grade for a certain student/instrument/teacher combo
exports.updateGrade = (req, res) => {
    Grade.updateGrade(req.query.student_name, req.query.instrument_name,  req.query.teacher_id, req.query.grade_id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while updating the grade."
            });
        else res.send(data);
    });
};