const express=require("express");
const { userRegister, userGet, singleUserGet, userEdit, userDelete, userStatusUpdate } = require("../Controllers/UserController");
const upload=require("../multerConfig/StorageConfig")
const router=express.Router();


router.post("/register",upload.single("user_profile"),userRegister)
router.get("/details",userGet)
router.get("/:id",singleUserGet)
router.put("/edit/:id",upload.single("user_profile"),userEdit)
router.delete("/delete/:id",userDelete)
router.put("/status/:id",userStatusUpdate)
module.exports=router