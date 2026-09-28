const express=require("express");
const router=express.Router();
const authMiddleware=require("../middlewares/auth.middleware");
const roleMiddleware=require("../middlewares/role.middleware");
const providerOwnership=require("../middlewares/providerOwnership.middleware");
const trainingProgramController=require(
    "../controllers/trainingProgram.controller"
);


router.post(
    "/",
    authMiddleware,
    roleMiddleware("provider_user"),
    providerOwnership,
    trainingProgramController.createTrainingProgram
);

router.get(
    "/",
    authMiddleware,
    roleMiddleware("provider_user"),
    providerOwnership,
    trainingProgramController.getMyTrainingPrograms
);

router.get(
    "/:programId",
    authMiddleware,
    roleMiddleware("provider_user"),
    providerOwnership,
    trainingProgramController.getTrainingProgram
);

router.patch(
    "/:programId",
    authMiddleware,
    roleMiddleware("provider_user"),
    providerOwnership,
    trainingProgramController.updateTrainingProgram
);

router.patch(
    "/:programId/deactivate",
    authMiddleware,
    roleMiddleware("provider_user"),
    providerOwnership,
    trainingProgramController.deactivateTrainingProgram
);

module.exports=router;