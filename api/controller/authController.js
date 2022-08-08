const accountController = require('./accountController')
const bcrypt = require("bcrypt");
const Account = require("../models/Account");

const handleRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newAccount = new Account({
            username: req.body.username,
            password: hashedPass,
            email: req.body.email,
            birthday: req.body.birthday,
            profilePicture: req.body.profilePicture
        });
        await accountController.createNewAccount(newAccount);
        res.status(200).send(true);
    } catch (err) {
        res.status(500).json(err);
    }
}
//true nếu tìm được username
//false nếu username chưa có
const checkExistedUsername = async (req, res) => {
    try {
        // const check = await accountController.getAccountByProp("username", req.params.username);
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