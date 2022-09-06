const authRoute = require("./auth");
const accountRoute = require("./account");
const studySetRoute = require("./studySet");
const cardRoute = require("./card");
const refreshTokenRoute = require("./refreshToken");
const globalErrorHandler = require("../controllers/errorController");
const AppError = require("../utils/appError");
const emailRoute = require("./email");
const { verifyJWT } = require("../middlewares/auth");

function route(app) {
  app.use("/auth", authRoute);
  app.use("/refresh-token", refreshTokenRoute);
  //app.use(verifyJWT);
  app.use("/email", emailRoute);
  app.use("/accounts", verifyJWT, accountRoute);
  app.use("/study-sets", studySetRoute);
  app.use("/cards", cardRoute);

  app.use(globalErrorHandler);
  app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`), 404);
  });
}

module.exports = route;
