module.exports = app => {
    const userController = require("../controllers/user_controller.js");
    const router = require("express").Router();

    // Create a new User
    router.post("/", userController.create);

    // Retrieve all Users
    router.get("/", userController.findAll);

    // Retrieve all active students connected to teacher id and their deets
    router.get("/studentlist", userController.getStudentList);

    //Get all student names for a teacher
    router.get("/studentinst", userController.getStudentInstruments);

    // Get student_id and instrument_id from teacher_id, student_name, instrument_name
    router.get("/studentids", userController.getStudentIds);

    //// Retrieve a single User with id
    //router.get("/:id", userController.findOne);

    // Validate login
    router.post("/login", userController.validateLogin);

    //// Update a User with id
    //router.put("/:id", userController.update);

    //// Delete a User with id
    //router.delete("/:id", userController.delete);

    app.use("/api/users", router);
};