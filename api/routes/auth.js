const router = require('express').Router();
const Account = require("../models/Account");
const bcrypt = require("bcrypt");
const authController = require('../controller/authController')

//Register

router.post("/register", authController.handleRegister);
router.get("/user/username/", authController.checkExistedUsername);
// router.get("/user/username/:username", authController.checkExistedUsername);
router.get("/user/email/", authController.checkExistedEmail);
module.exports = router;