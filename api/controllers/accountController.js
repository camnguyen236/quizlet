const bcrypt = require('bcrypt');
const Account = require('../models/Account');

class accountController {
   // [POST]
   createNewAccount = async (newAccount) => {
      try {
         const account = await newAccount.save();
         return true;
      } catch (err) {
         console.log(err);
         return false;
      }
   };

   // [PUT] /accounts/update?id=
   updateAccount = async (req, res) => {
      //if update password then hash it
      if (req.body.password) {
         const salt = await bcrypt.genSalt(10);
         req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      try {
         await Account.findByIdAndUpdate(
            req.query.id,
            {
               $set: req.body,
               //options.new: true => return the modified doc rather than the original
            },
            { new: true, overwrite: false }
         );
         res.status(200).json('Updated account successfully!');
      } catch (err) {
         res.status(500).json(err);
      }
   };

   // [DELETE] /accounts/delete?id=
   deleteAccount = async (req, res) => {
      try {
         await Account.findByIdAndDelete(req.query.id);
         res.status(200).json('Deleted account successfully!');
      } catch (err) {
         res.status(500).json(err);
      }
   };

   // [GET] /accounts/find?id=
   getAccount = async (req, res) => {
      try {
         const account = await Account.findById(req.query.id);
         const { password, ...others } = account._doc;
         res.status(200).json(others);
      } catch (err) {
         res.status(500).json(err);
      }
   };

   //thật là thắc mắc??? tại sao truyền [prop: val] vào findOne không được?
   // truyền condition = {prop: val} cũng k đc
   // mà như dưới lại đc???? ủa
   //get được trả về true
   getAccountByProp = async (prop, val) => {
      const condition = {};
      condition[prop] = val;
      let flag = false;
      const account = await Account.findOne(condition);
      if (account !== null) flag = true;
      return flag;
   };
}

module.exports = new accountController();
