module.exports = app => {
    const gradeController = require("../controllers/grade_controller.js");
    const router = require("express").Router();

    // Retrieve all grades
    router.get("/", gradeController.findAll);  

    // Get single grade id from name
    router.get("/id", gradeController.getId);  

    // Update grade
    router.put("/update", gradeController.updateGrade);  
       
    app.use("/api/grades", router);
};