const Account = require('../models/Account');
const bcrypt = require('bcrypt');

class authController {
    // [POST] /login
    login = async(req, res) => {
        try {
            const user = await Account.findOne({ username: req.body.username});
            if (!user) {
                return res.status(404).json('Wrong username');
            }

            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!validPassword) {
                return res.status(404).json('Wrong password')
            }
            
            if (user && validPassword) {
                res.status(200).json(user)
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = new authController();