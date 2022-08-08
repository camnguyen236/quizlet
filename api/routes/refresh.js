const router = require('express').Router();
const refreshTokenController = require('../controllers/refreshTokenController');

// Refresh Token
router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;