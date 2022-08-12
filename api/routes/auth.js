const router = require('express').Router();
const authController = require('../controllers/authController');
const passport = require('passport');
const { isAuthenticated } = require('../middlewares/auth')

router.get('/main', isAuthenticated, (req, res) => {
    res.render('main');
})
router.get('/login', function (req, res, next) {
    res.render('login');
});

// Login with username and password
router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/auth/main',
        failureRedirect: '/auth/login'
    }));

// Logout
router.get('/logout', authController.handleLogout);

module.exports = router;