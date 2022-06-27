//import * as moment from 'moment';

module.exports.isValidString = (value) => typeof value === "string" && value.trim().length > 0;
module.exports.isValid = (value) => value !== null && typeof value !== 'undefined'
module.exports.isValidObject = (obj) => Object.keys(obj).length > 0;
module.exports.isValidEmail = (email) =>
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
  const bcrypt = require("bcrypt");

module.exports.SALT = bcrypt.genSaltSync(10);
module.exports.JWT_SECRET = "some-very-secure-random-string";
function isDate(date){
  let isValidDate=Date.parse(date);
if(isNaN(isValidDate)){
return false}
else
return true}


module.exports.isDate=isDate;


module.exports.isArray=(input)=> toString.call(input)==="[object Array]"