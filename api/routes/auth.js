const router = require('express').Router();
const Account = require("../models/Account");
const authController = require('../controllers/authController');
const passport = require('passport');
const { isAuthenticated } = require('../middlewares/auth')

router.get('/main', isAuthenticated, (req, res) => {
    res.render('main');
})
router.get('/login', function(req, res, next) {
    res.render('login');
});
router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', 
  passport.authenticate('google', 
    { 
        successRedirect: '/api/auth/main',
        failureRedirect: '/api/auth/login', 
    }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/facebook',
passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook',
   { 
    successRedirect: '/api/auth/main',
    failureRedirect: '/api/auth/login', 
    }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


router.post('/login', passport.authenticate('local', 
{ 
    successRedirect: '/api/auth/main',
    failureRedirect: '/api/auth/login', 
    // failureMessage: true
}));
router.get('/logout', authController.handleLogout);

module.exports = router;