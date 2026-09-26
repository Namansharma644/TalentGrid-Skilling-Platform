const express=require("express");
const router=express.Router();
const authMiddleware=require("../middlewares/auth.middleware");
const roleMiddleware=require("../middlewares/role.middleware");
const districtOfficerController=require("../controllers/districtOfficer.controller");

router.post(
    "/",
    authMiddleware,
    roleMiddleware("government_admin"),
    districtOfficerController.createDistrictOfficer
);

module.exports=router;