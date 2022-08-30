const router = require('express').Router();
const accountController = require('../controllers/accountController');
const { validateRequest } = require("../middlewares/auth");

////// UPDATE Account //////
router.put(
    '/:username',
    validateRequest,
    accountController.updateAccount
);

////// DELETE Account //////
router.delete(
    '/:username',
    validateRequest,
    accountController.deleteAccount
);

////// GET Account //////
router.get(
    '/:username',
    validateRequest,
    accountController.getAccount
);

////// GET Account by accessToken //////
router.get(
    '/',
    accountController.getAccountByAccToken
);

////// GET Achievements //////
router.get(
    '/:username/achievement',
    validateRequest,
    accountController.getAchievements
);

////// UPDATE Achievements //////
router.put(
    '/:username/achievement',
    validateRequest,
    accountController.updateAchievement
);

module.exports = router;
