const express=require("express");
const router=express.Router();
const authMiddleware=require("../middlewares/auth.middleware");
const roleMiddleware=require("../middlewares/role.middleware");
const providerUserController=require("../controllers/providerUser.controller");

router.post(
    "/",
    authMiddleware,
    roleMiddleware("government_admin"),
    providerUserController.createProviderUser
);

module.exports=router;