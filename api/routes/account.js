const router = require('express').Router();
const accountController = require('../controllers/accountController');

////// UPDATE Account //////
router.put('/update', accountController.updateAccount);

////// DELETE Account //////
router.delete('/delete', accountController.deleteAccount);

////// GET Account //////
router.get('/find', accountController.getAccount);

module.exports = router;
