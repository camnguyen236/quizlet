const authRoute = require('./auth');
const accountRoute = require('./account');
const studySetRoute = require('./studySet');
const cardRoute = require('./card');

function route(app) {
   app.use('/auth', authRoute);
   app.use('/accounts', accountRoute);
    app.use("/study-set", studySetRoute);
    app.use("/card", cardRoute);
}

module.exports = route;