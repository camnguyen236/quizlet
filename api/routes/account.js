const router = require('express').Router();
const accountController = require('../controllers/accountController');

////// UPDATE Account //////
router.put('/update', accountController.updateAccount);

////// DELETE Account //////
router.delete('/delete', accountController.deleteAccount);

////// GET Account //////
router.get('/find', accountController.getAccount);

////// GET Achievements //////
router.get('/find/achievement', accountController.getAchievements);

////// UPDATE Achievements //////
router.get('/update/achievement', accountController.updateAchievement);

module.exports = router;
