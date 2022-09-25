const dbCon = require('../db.js');

module.exports = Grade = function (grade) {
    this.grade_name = grade.grade_name;
}

Grade.findAll = (result) => {
    dbCon.query("SELECT grade_name FROM grades", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found grades: ", res);
            result(null, res);
            return;
        }
    });
}

Grade.getId = (grade, result) => {
    dbCon.query(`SELECT grade_id FROM grades WHERE grade_name="${grade}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found grade id: ", res);
            result(null, res);
            return;
        }
    });
}

Grade.updateGrade = (name, instrument, teacherId, gradeId, result) => {
    dbCon.query(`CALL usp_UpdateGrade("${name}","${instrument}",${teacherId},${gradeId})`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res) {
            console.log("updated grade: ", res);
            result(null, res);
            return;
        }
    });
}