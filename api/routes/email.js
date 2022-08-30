const router = require('express').Router();
const sendEmailController = require('../controllers/sendEmailController');

// Add
router.post('/', sendEmailController.sendEmail);

module.exports = router;