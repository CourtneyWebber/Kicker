module.exports = app => {
    const goalController = require("../controllers/goal_controller.js");
    const router = require("express").Router();

    // Create a new goal
    router.post("/add", goalController.create);

    // Get current goals for specific student/instrument/teacher combo
    router.get("/", goalController.getByStudentInstrument);

    // Get completed goals for specific student/instrument/teacher combo
    router.get("/completed", goalController.getCompleted);

    // Update goal by id
    router.put("/update", goalController.updateGoalById);

    //Delete goal by id
    router.delete("/delete", goalController.deleteOne);

    app.use("/api/goals", router);
};