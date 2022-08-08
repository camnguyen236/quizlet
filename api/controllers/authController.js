const Account = require('../models/Account');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

class authController {
    // [POST] /login
    handleLogin = async (req, res) => {
        try {
            const cookies = req.cookies;
            const user = await Account.findOne({ username: req.body.username});
            if (!user) {
                return res.status(404).json('Wrong username');
            }

            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!validPassword) {
                return res.status(404).json('Wrong password');
            }

            if (user && validPassword) {
                // Create JWTs
                const accessToken = jwt.sign(
                    { "username": user.username },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '15m' }
                );
                const newRefreshToken = jwt.sign(
                    { "username": user.username },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: '1d' }
                );

                let newRefreshTokenArray = 
                    !cookies?.refreshToken
                        ? user.refreshToken
                        : user.refreshToken.filter(rt => rt !== cookies.refreshToken);

                if (cookies?.refreshToken) {
                    const refreshToken = cookies.refreshToken;
                    const foundToken = await Account.findOne({ refreshToken }).exec();

                    // Detected refresh token reuse
                    if (!foundToken) {
                        console.log('attempted refresh token reuse at login');
                        // Clear out all previous refresh tokens
                        newRefreshTokenArray = [];
                    }

                    res.clearCookie('refreshToken', {
                        httpOnly: true,
                        secure: false,
                        sameSite: "strict"
                    });
                }                    
                
                // Saving refreshToken with current user
                user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
                const result = await user.save();
                console.log(result);
                
                res.cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "strict"
                });
                res.status(200).json({ accessToken });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // [GET] /logout
    handleLogout = async (req, res) => {
        try {
            const cookies = req.cookies;
            if (!cookies?.refreshToken) {
                return res.sendStatus(204); // No content
            }
            const refreshToken = cookies.refreshToken;

            // Is refreshToken in db?
            const foundUser = await Account.findOne({ refreshToken: refreshToken}).exec();
            if (!foundUser) {
                res.clearCookie('refreshToken', {
                    httpOnly: true,
                    secure: false,
                    sameSite: "strict"
                });
                return res.sendStatus(204);
            }

            // Delete refreshToken in db
            foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);;
            const result = await foundUser.save();
            console.log(result);

            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: false,
                sameSite: "strict"
            });
            return res.sendStatus(204);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = new authController();