const Account = require('../models/Account');
const bcrypt = require('bcrypt');
const passport = require('passport');
const accountController = require('./accountController');

class authController {
   // [POST] /login
   handleLogin = () => {
      passport.authenticate('local', {
         successRedirect: '/auth/main',
         failureRedirect: '/auth/login'
      });
   };

   // [GET] /logout
   handleLogout = (req, res, next) => {
      req.logout(function (err) {
         if (err) {
            return next(err);
         }
         res.redirect('/auth/login');
      });
   };

   // [POST] /register
   handleRegister = async (req, res) => {
      try {
         //hash the password
         const salt = await bcrypt.genSalt(10);
         const hashedPass = await bcrypt.hash(req.body.password, salt);

         const newAccount = new Account({
            username: req.body.username,
            password: hashedPass,
            email: req.body.email,
            birthday: req.body.birthday,
            profilePicture: req.body.profilePicture,
            achievement: {
               month: new Date().getMonth() + 1,
               achieve: [],
               dayStreak: 0,
               weekStreak: 0
            }
         });
         //create new account to db
         await newAccount.save();
         //if success send response true and status to FE
         res.status(200).send(true);
      } catch (err) {
         res.status(500).send(false);
      }
   };

   // Return true if USERNAME existed
   // Return false if USERNAME is new
   checkExistedUsername = async (req, res) => {
      try {
         const check = await accountController.getAccountByProp(
            'username',
            req.query.username
         );
         if (check) {
            res.send(true);
            return true;
         } else {
            res.send(false);
            return false;
         }
      } catch (err) {
         res.status(500).json(err);
      }
   };

   //Return true if EMAIL existed
   //Return false if EMAIL is new
   checkExistedEmail = async (req, res) => {
      try {
         const check = await accountController.getAccountByProp(
            'email',
            req.query.email
         );
         if (check) {
            res.send(true);
            return true;
         } else {
            res.send(false);
            return false;
         }
      } catch (err) {
         res.status(500).json(err);
      }
   };
}

module.exports = new authController();
