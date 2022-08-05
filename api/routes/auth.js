const router = require('express').Router();
const Account = require("../models/Account");

//Register

router.post("/register", async (req,res) => {
    const newAccount = new Account({
        username: req.body.username,
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        birthday: req.body.birthday,
        profilePicture: req.body.profilePicture
    });
    const account = await newAccount.save((err) => {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(account);
        }
    });
});

module.exports = router;