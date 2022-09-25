const Goal = require("../models/goal_model");

// Create and Save a new goal
exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };
    console.log(req);

    // Create a goal
    const newGoal = new Goal({
        goal_description: req.body.goal_description,
        goal_startdate: req.body.goal_startdate,
        goal_iscomplete: req.body.goal_iscomplete,
        goal_finishdate: req.body.goal_finishdate,
        teacher_id: req.body.teacher_id,
        student_id: req.body.student_id,
        instrument_id: req.body.instrument_id
    });

    // Save goal in the database
    Goal.create(newGoal, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the goal."
            });
        else res.send(data);
    });
};

//Gets current goals for a specific student/instrument/teacher combo
exports.getByStudentInstrument = (req, res) => {
    Goal.getByStudentInstrument(req.query.student_name, req.query.teacher_id, req.query.instrument_name, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while getting the goals."
            });
        else res.send(data);
    });
};

//Gets completed goals for a specific student/instrument/teacher combo
exports.getCompleted = (req, res) => {
    Goal.getCompleted(req.query.student_id, req.query.instrument_id, req.query.teacher_id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while getting the goals."
            });
        else res.send(data);
    });
};

// Updates a goal (to completed) by goal_id
exports.updateGoalById = (req, res) => {
    Goal.updateGoalById(req.query.goal_id, req.query.goal_iscomplete, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while updating the goal."
            });
        else res.send(data);
    });
};

//Deletes a single goal based on goal_id
exports.deleteOne = (req, res) => {
    Goal.deleteOne(req.query.goal_id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting the goal."
            });
        else res.send(data);
    });
};