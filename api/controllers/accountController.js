const Account = require('../models/Account');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

class accountController {
    // [GET] 
    //GET ALL USER
    getAllUsers = async (req, res) => {
        try {
            const user = await Account.find();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

module.exports = new accountController();