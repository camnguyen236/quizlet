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

//Login with google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google',
    {
        successRedirect: '/api/auth/main',
        failureRedirect: '/api/auth/login',
    }));

// Login with facebook
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook',
    {
        successRedirect: '/api/auth/main',
        failureRedirect: '/api/auth/login',
    }));

// Login with username and password
router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/api/auth/main',
        failureRedirect: '/api/auth/login'
    }));

// Logout
router.get('/logout', authController.handleLogout);

module.exports = router;