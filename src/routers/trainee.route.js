const express=require("express");
const router=express.Router();
const authMiddleware=require("../middlewares/auth.middleware");
const roleMiddleware=require("../middlewares/role.middleware");
const {
    traineeOwnership
} = require("../middlewares/traineeOwnership.middleware");
const traineeController = require("../controllers/trainee.controller");

router.post(
    "/",
    authMiddleware,
    roleMiddleware("trainee"),
    traineeController.createTraineeProfile
);

router.get(
    "/me",
    authMiddleware,
    roleMiddleware("trainee"),
    traineeController.getMyTraineeProfile
);

router.patch(
    "/me",
    authMiddleware,
    roleMiddleware("trainee"),
    traineeOwnership,
    traineeController.updateMyTraineeProfile
);

module.exports=router;