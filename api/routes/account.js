const router = require('express').Router();
const accountController = require('../controllers/accountController');
const { verifyJWT, validateRequest } = require('../middlewares/auth');

////// UPDATE Account //////
router.put(
    '/:username',
    verifyJWT,
    validateRequest,
    accountController.updateAccount
);

////// DELETE Account //////
router.delete(
    '/:username',
    verifyJWT,
    validateRequest,
    accountController.deleteAccount
);

////// GET Account //////
router.get(
    '/:username',
    verifyJWT,
    validateRequest,
    accountController.getAccount
);

////// GET Achievements //////
router.get(
    '/:username/achievement',
    verifyJWT,
    validateRequest,
    accountController.getAchievements
);

////// UPDATE Achievements //////
router.put(
    '/:username/achievement',
    verifyJWT,
    validateRequest,
    accountController.updateAchievement
);

module.exports = router;
