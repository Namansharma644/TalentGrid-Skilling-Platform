const express=require("express");
const router=express.Router();
const districtController=require("../controllers/district.controller");

router.post(
    "/",
    districtController.createDistrict
);

module.exports=router;