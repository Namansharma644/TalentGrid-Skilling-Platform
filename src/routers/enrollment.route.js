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

router.get(
    "/",
    authMiddleware,
    roleMiddleware("provider_user"),
    providerOwnership,
    enrollmentController.getMyEnrollments
);

router.get(
    "/:enrollmentId",
    authMiddleware,
    roleMiddleware("provider_user"),
    providerOwnership,
    enrollmentController.getEnrollment
);

router.patch(
    "/:enrollmentId",
    authMiddleware,
    roleMiddleware("provider_user"),
    providerOwnership,
    enrollmentController.updateEnrollmentStatus
);

module.exports=router;