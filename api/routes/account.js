const router = require("express").Router();
const accountController = require("../controllers/accountController");
const { isAuthenticated } = require("../middlewares/auth");

////// UPDATE Account //////
router.put("/:id", isAuthenticated, accountController.updateAccount);

////// DELETE Account //////
router.delete("/:id", isAuthenticated, accountController.deleteAccount);

////// GET Account //////
router.get("/:id", isAuthenticated, accountController.getAccount);

////// GET Achievements //////
router.get(
  "/:id/achievement",
  isAuthenticated,
  accountController.getAchievements
);

////// UPDATE Achievements //////
router.get(
  "/:id/achievement",
  isAuthenticated,
  accountController.updateAchievement
);

router.get("/profile", isAuthenticated, (req, res, next) => {
  //here it is
  const user = req.user;

  //you probably also want to pass this to your view
  res.send(user);
});

module.exports = router;
