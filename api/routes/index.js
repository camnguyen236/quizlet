const authRoute = require('./auth');
const accountRoute = require('./account');
const studySetRoute = require('./studySet');

function route(app) {
   app.use('/auth', authRoute);
   app.use('/accounts', accountRoute);
    app.use("/study-set", studySetRoute);
}

module.exports = route;