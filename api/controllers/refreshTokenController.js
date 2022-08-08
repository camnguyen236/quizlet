const Account = require('../models/Account');
const jwt = require('jsonwebtoken')

class refreshTokenController {
    // [GET] 
    handleRefreshToken = async (req, res) => {
        try {
            const cookies = req.cookies;
            if (!cookies?.refreshToken) {
                return res.sendStatus(401);
            }
            const refreshToken = cookies.refreshToken;
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: false,
                sameSite: "strict"
            });

            const foundUser = await Account.findOne({ refreshToken: refreshToken}).exec();

            // Detected refresh token reuse
            if (!foundUser) {
                jwt.verify(
                    refreshToken,
                    process.env.REFRESH_TOKEN_SECRET,
                    async (err, decoded) => {            
                        if (err) return res.sendStatus(403);
                        const hackedUser = await Account.findOne({username: decoded.username}).exec();
                        hackedUser.refreshToken = [];
                        const result = await hackedUser.save();
                        console.log(result);
                    }
                )  
                return res.sendStatus(403) // Forbidden
            }

            const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

            // evaluate jwt
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                async (err, decoded) => {       
                    if (err) {
                        foundUser.refreshToken = [...newRefreshTokenArray];
                        const result = await foundUser.save();

                    }     
                    if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
                    
                    // Refresh token still valid
                    const accessToken = jwt.sign(
                        {"username": decoded.username},
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: '15m'}
                    );

                    const newRefreshToken = jwt.sign(
                        { "username": foundUser.username },
                        process.env.REFRESH_TOKEN_SECRET,
                        { expiresIn: '1d' }
                    );
                    
                    // Saving refreshToken with current user
                    foundUser.refreshToken = [... newRefreshTokenArray, newRefreshToken];
                    const result = await foundUser.save();

                    res.cookie('refreshToken', newRefreshToken, {
                        httpOnly: true,
                        secure: false,
                        sameSite: "strict"
                    });

                    res.json({ accessToken })
                }
            )            
        } catch (error) {
            res.status(500).json(error);
        }
    }    
};

module.exports = new refreshTokenController();