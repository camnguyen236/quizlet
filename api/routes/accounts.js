const router = require('express').Router();
const accountController = require('../controllers/accountController');

// Get all users
router.get("/", accountController.getAllUsers);

module.exports = router;