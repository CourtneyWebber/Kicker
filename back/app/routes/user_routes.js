module.exports = app => {
    const userController = require("../controllers/user_controller.js");
    const router = require("express").Router();

    // Create a new User
    router.post("/", userController.create);

    // Retrieve all Users
    router.get("/", userController.findAll);

    //// Retrieve a single User with id
    //router.get("/:id", userController.findOne);

    // Validate login
    router.post("/login", userController.validateLogin);

    //// Update a User with id
    //router.put("/:id", userController.update);

    //// Delete a User with id
    //router.delete("/:id", userController.delete);

    //// Create a new User
    //router.delete("/", userController.deleteAll);

    app.use("/api/users", router);
};