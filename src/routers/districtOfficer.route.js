const express=require("express");
const router=express.Router();
const authMiddleware=require("../middlewares/auth.middleware");
const roleMiddleware=require("../middlewares/role.middleware");
const districtOfficerOwnership=require("../middlewares/districtOwnership.middleware");
const districtOfficerController=require("../controllers/districtOfficer.controller");

router.post(
    "/",
    authMiddleware,
    roleMiddleware("government_admin"),
    districtOfficerController.createDistrictOfficer
);

router.get(
    "/me",
    authMiddleware,
    roleMiddleware("district_officer"),
    districtOfficerOwnership,
    districtOfficerController.getMyDistrictOfficerProfile
);

router.get(
    "/trainees",
    authMiddleware,
    roleMiddleware("district_officer"),
    districtOfficerOwnership,
    districtOfficerController.getDistrictTrainees
);

module.exports=router;