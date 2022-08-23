const authRoute = require('./auth');
const accountRoute = require('./account');
const studySetRoute = require('./studySet');
const cardRoute = require('./card');
const refreshTokenRoute = require('./refreshToken');

function route(app) {
   app.use('/auth', authRoute);
   app.use('/accounts', accountRoute);
   app.use('/study-sets', studySetRoute);
   app.use('/cards', cardRoute);
   app.use('/refresh-token', refreshTokenRoute);
}

module.exports = route;