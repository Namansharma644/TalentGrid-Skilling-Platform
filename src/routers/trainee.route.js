const express=require("express");
const router=express.Router();
const authMiddleware=require("../middlewares/auth.middleware");
const roleMiddleware=require("../middlewares/role.middleware")
const {
    traineeOwnership
} = require("../middlewares/trainee.middleware");
const traineeController = require("../controllers/trainee.controller");

router.post(
    "/",
    authMiddleware,
    roleMiddleware("trainee"),
    traineeController.createTraineeProfile
);

router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("trainee"),
    traineeOwnership,
    traineeController.getTrainee
);

module.exports=router;