const bcrypt = require("bcrypt");
const Account = require("../models/Account");

const createNewAccount = async (newAccount) => {
        try {
            const account = await newAccount.save();
            return true;
        } catch(err) {
            console.log(err);
            return false;
        }
};

//thật là thắc mắc??? tại sao truyền [prop: val] vào findOne không được?
// truyền condition = {prop: val} cũng k đc
// mà như dưới lại đc???? ủa
//get được trả về true
const getAccountByProp =  async (prop, val) => {
    const condition = {};
    condition[prop] = val;
    let flag = false;
    const account = await Account.findOne(condition);
    if(account !== null) flag = true;
    return flag;
}

module.exports = {
    createNewAccount,
    getAccountByProp
}
