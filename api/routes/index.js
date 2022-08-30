const authRoute = require('./auth');
const accountRoute = require('./account');
const studySetRoute = require('./studySet');
const cardRoute = require('./card');
const refreshTokenRoute = require('./refreshToken');
const emailRoute = require('./email');
const { verifyJWT } = require("../middlewares/auth");

function route(app) {
   app.use('/auth', authRoute);
   app.use('/refresh-token', refreshTokenRoute);
   app.use('/email', emailRoute);
   app.use(verifyJWT);
   app.use('/accounts', accountRoute);
   app.use('/study-sets', studySetRoute);
   app.use('/cards', cardRoute);
}

module.exports = route;