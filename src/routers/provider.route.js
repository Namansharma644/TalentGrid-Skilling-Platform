const express=require("express");
const router=express.Router();
const authMiddleware=require("../middlewares/auth.middleware");
const roleMiddleware=require("../middlewares/role.middleware");
const providerController=require("../controllers/provider.controller");


router.post(
    "/",
    authMiddleware,
    roleMiddleware("government_admin"),
    providerController.createProvider
);

module.exports=router;