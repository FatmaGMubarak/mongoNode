const express = require("express")
const router = express.Router()
const {register,login,listAllUsers} = require("./controller")
router.post("/register",register);
router.post("/login",login);
router.get("/",listAllUsers);






module.exports = router;