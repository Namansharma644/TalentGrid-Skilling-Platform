const express=require("express");
const router=express.Router();
const authMiddleware=require("../middlewares/auth.middleware");
const roleMiddleware=require("../middlewares/role.middleware");
const providerOwnership=require("../middlewares/providerOwnership.middleware");
const enrollmentController = require("../controllers/enrollment.controller");


router.post(
    "/",
    authMiddleware,
    roleMiddleware("provider_user"),
    providerOwnership,
    enrollmentController.createEnrollment
);

module.exports=router;