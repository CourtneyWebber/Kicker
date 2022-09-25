const dbCon = require('../db.js');

module.exports = Goal = function (goal) {
    this.goal_description = goal.goal_description;
    this.goal_startdate = goal.goal_startdate;
    this.goal_iscomplete = goal.goal_iscomplete;
    this.goal_finishdate = goal.goal_finishdate;
    this.teacher_id = goal.teacher_id;
    this.student_id = goal.student_id;
    this.instrument_id = goal.instrument_id;
}

Goal.create = (newGoal, result) => {
    dbCon.query("INSERT INTO goals SET ?", newGoal, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created goal: ", { id: res.insertId, ...newGoal });
        result(null, { id: res.insertId, ...newGoal });
    });
};

Goal.getByStudentInstrument = (student_name, teacher_id, instrument_name, result) => {
    dbCon.query(`CALL usp_GetCurrentGoals("${student_name}", ${teacher_id}, "${instrument_name}")`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found current goals: ", res);
            result(null, res);
            return;
        }
    });
}

Goal.getCompleted = (student_id, instrument_id, teacher_id, result) => {
    dbCon.query(`CALL usp_GetCompletedGoals(${student_id}, ${instrument_id}, ${teacher_id})`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found completed goals: ", res);
            result(null, res);
            return;
        }
    });
}

Goal.updateGoalById = (goal_id, goal_iscomplete) => {
    if (goal_iscomplete) {
        dbCon.query(`UPDATE goals SET goal_iscomplete=1, goal_finishdate=CURRENT_DATE() WHERE goal_id=${goal_id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                console.log("updated goal: ", res);
                result(null, res);
                return;
            }
        });
    }
    else {
        dbCon.query(`UPDATE goals SET goal_description=${goal_description} WHERE goal_id=${goal_id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                console.log("updated goal: ", res);
                result(null, res);
                return;
            }
        });
    }    
}

Goal.deleteOne = (goal_id) => {
    dbCon.query(`DELETE FROM goals WHERE goal_id=${goal_id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("deleted goal: ", res);
            result(null, res);
            return;
        }
    });
}