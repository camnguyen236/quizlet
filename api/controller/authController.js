const accountController = require("./accountController")
const bcrypt = require("bcrypt");
const Account = require("../models/Account");

require("dotenv").config();

// const handleGoogleRegister = async (ggId, ggPhoto) => {
//     try {
//
//         const newAccount = new Account({
//             googleId: ggId,
//             profilePicture: ggPhoto
//         });
//         //create new account to db
//         await accountController.createNewAccount(newAccount);
//         console.log("in handle regis" + newAccount);
//     } catch (err) {
//         console.log(err);
//     }
// }

const handleRegister = async (req, res) => {
    try {
        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const newAccount = new Account({
            username: req.body.username,
            password: hashedPass,
            email: req.body.email,
            birthday: req.body.birthday,
            profilePicture: req.body.profilePicture
        });

        //create new account to db
        await accountController.createNewAccount(newAccount);
        //if success send response true and status to FE
        res.status(200).send(true);
    } catch (err) {
        res.status(500).json(err);
    }
}
//true nếu tìm được username
//false nếu username chưa có
const checkExistedUsername = async (req, res) => {
    try {
        const check = await accountController.getAccountByProp("username", req.query.username);
        if (check) {
            res.send(true);
            return true;
        } else {
            res.send(false);
            return false;
        }
    } catch (err) {
        res.status(500).json(err);
    }
}
//true nếu tìm được email
//false nếu email chưa có
const checkExistedEmail = async (req, res) => {
    try {
        const check = await accountController.getAccountByProp("email", req.query.email);
        if (check) {
            res.send(true);
            return true;
        } else {
            res.send(false);
            return false;
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    handleRegister,
    checkExistedUsername,
    checkExistedEmail
}