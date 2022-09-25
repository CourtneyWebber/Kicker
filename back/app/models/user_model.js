const dbCon = require('../db.js');
const bcrypt = require("bcrypt");

module.exports = User = function (user) {
    this.user_type = user.user_type;
    this.user_firstname = user.user_firstname;
    this.user_surname = user.user_surname;
    this.user_phone = user.user_phone;
    this.user_email = user.user_email;
    this.user_username = user.user_username;
    this.user_password = user.user_password;
    this.user_isactive = user.user_isactive;
};

const comparePassword = async (password, hash) => {
    try {
        console.log(password + ' ' + hash);
        return await bcrypt.compare(password, hash);
    } catch (e) {
        console.log(e);
    }
    return false;
};

User.validateLogin = (username, password, result) => {
    dbCon.query(`SELECT * FROM users WHERE user_username = "${username}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result({ kind: "not_found" }, null);
            return;
        }
        else {
            const isCorrectPassword = comparePassword(password, res[0].user_password);
            if (isCorrectPassword) {
                //log in
                console.log("correct");
                result(null, res[0]);
                return;
            }
            else {
                //show error
                result({ kind: "invalid" }, null);
                console.log("Entered password doesn't match.");
            }            
        }
    });
};

User.create = (newUser, result) => {
    dbCon.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

User.findAll = (result) => {
    dbCon.query("SELECT * FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found user: ", res);
            result(null, res);
            return;
        }
    });
}

User.getStudentList = (id, result) => {
    dbCon.query(`CALL usp_GetActiveStudentsForTeacher(${id})`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found students: ", res);
            result(null, res);
            return;
        }
    });
}

User.getStudentInstruments = (name, id, result) => {
    dbCon.query(`CALL usp_GetInstrumentsForUser("${name}", ${id})`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found student instrument(s): ", res);
            result(null, res);
            return;
        }
    });
}

User.getStudentIds = (student_name, instrument_name, teacher_id, result) => {
    dbCon.query(`CALL usp_GetStudentIds("${student_name}", "${instrument_name}", ${teacher_id})`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found student ids: ", res);
            result(null, res);
            return;
        }
    });
}