const jwt = require('jsonwebtoken');

module.exports = {
   isAuthenticated: function (req, res, next) {
      if (req.isAuthenticated()) {
         return next();
      }
      res.redirect('/auth/login');
   },
   verifyJWT: function verifyJWT(req, res, next) {
      const authHeader = req.headers.authorization || req.headers.Authorization;
      if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
      console.log(authHeader);
      const token = authHeader.split(' ')[1];
      jwt.verify(
         token,
         process.env.ACCESS_TOKEN_SECRET,
         (err, decoded) => {
            if (err) return res.sendStatus(403); // invalid token
            req.user = decoded.username;
            next();
         }
      )
   }
};