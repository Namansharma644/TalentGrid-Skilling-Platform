const express=require("express");
const router=express.Router();
const authController=require("../controllers/auth.controller");
const testController=require("../controllers/test.controller");
const authMiddleware=require("../middlewares/auth.middleware");
const roleMiddleware=require("../middlewares/role.middleware")

router.post("/register",authController.userRegister);
router.post("/login",authController.userLogin);
router.get("/profile",authMiddleware,testController.profile);
router.get("/govDashBoard",authMiddleware,roleMiddleware("government_admin"),testController.govermentDashBoard);

module.exports=router;