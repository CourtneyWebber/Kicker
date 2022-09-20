const User = require("../models/user_model.js");
const bcrypt = require("bcrypt");

// Create and Save a new User
exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };

    // Create a User
    const newUser = new User({
        user_type: req.body.user_type,
        user_firstname: req.body.user_firstname,
        user_surname: req.body.user_surname,
        user_phone: req.body.user_phone,
        user_email: req.body.user_email,
        user_username: req.body.user_username,        
        user_password: await bcrypt.hash(req.body.user_password, 10),
        user_isactive: req.body.user_isactive
    });

    // Save User in the database
    User.create(newUser, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            });
        else res.send(data);
    });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
    User.findAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while getting the users."
            });
        else res.send(data);
    });
};

// Find and validate a single user with a username
exports.validateLogin = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }    
    User.validateLogin(req.body.user_username, req.body.user_password, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Cannot find user with username ${req.params.username} and/or matching password.`
                });
            } else if (err.kind === "invalid") {
                res.status(400).send({
                    message: `Invalid password`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving user with username " + req.params.username
                });
            }
        } else res.send(data);
    });
};

//// Find a single user with an id
//exports.findOne = (req, res) => {
//    // Validate Request
//    if (!req.body) {
//        res.status(400).send({
//            message: "Content can not be empty!"
//        });
//    }
//    User.findById(req.params.id, (err, data) => {
//        if (err) {
//            if (err.kind === "not_found") {
//                res.status(404).send({
//                    message: `Cannot find user with id ${req.params.id}.`
//                });
//            } else {
//                res.status(500).send({
//                    message: "Error retrieving user with id " + req.params.id
//                });
//            }
//        } else res.send(data);
//    });
//};

//// Update a user with an id
//exports.update = (req, res) => {
//    // Validate Request
//    if (!req.body) {
//        res.status(400).send({
//            message: "Content can not be empty!"
//        });
//    }
//    User.updateById(req.params.id, new User(req.body), (err, data) => {
//        if (err) {
//            if (err.kind === "not_found") {
//                res.status(404).send({
//                    message: `Cannot find user with id ${req.params.id}.`
//                });
//            } else {
//                res.status(500).send({
//                    message: "Error updating user with id " + req.params.id
//                });
//            }
//        } else res.send(data);
//    }
//    );
//};

//// Delete a user with an id
//exports.delete = (req, res) => {
//    // Validate Request
//    if (!req.body) {
//        res.status(400).send({
//            message: "Content can not be empty!"
//        });
//    }
//    User.deleteById(req.params.id, (err, data) => {
//        if (err) {
//            if (err.kind === "not_found") {
//                res.status(404).send({
//                    message: `Cannot find user with id ${req.params.id}.`
//                });
//            } else {
//                res.status(500).send({
//                    message: "Error updating user with id " + req.params.id
//                });
//            }
//        } else res.send(data);
//    }
//    );
//};

//// Delete all users
//exports.deleteAll = (req, res) => {
//    // Validate Request
//    if (!req.body) {
//        res.status(400).send({
//            message: "Content can not be empty!"
//        });
//    }
//    User.empty((err, data) => {
//        if (err) {
//            if (err.kind === "not_found") {
//                res.status(404).send({
//                    message: `Cannot find any users.`
//                });
//            } else {
//                res.status(500).send({
//                    message: "Error deleting users."
//                });
//            }
//        } else res.send(data);
//    }
//    );
//};
