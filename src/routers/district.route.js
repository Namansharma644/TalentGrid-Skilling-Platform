const express=require("express");
const router=express.Router();
const authMiddleware=require("../middlewares/auth.middleware");
const roleMiddleware=require("../middlewares/role.middleware");
const districtController=require("../controllers/district.controller");

router.post(
    "/",
    authMiddleware,
    roleMiddleware("government_admin"),
    districtController.createDistrict
);

module.exports=router;