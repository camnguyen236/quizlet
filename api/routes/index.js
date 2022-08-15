const authRoute = require('./auth');
const accountRoute = require('./account');

function route(app) {
   app.use('/auth', authRoute);
   app.use('/accounts', accountRoute);
}

module.exports = route;