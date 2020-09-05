const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = validateLoginInput = data => {
   let errors = {};

   let { username, password } = data;
   // Converting empty fields to empty string as validator function works only with strings
   username = !isEmpty(username) ? username : "";
   password = !isEmpty(password) ? password : "";

   if (Validator.isEmpty(username)) {
      errors.username = "Username is required";
   }

   if (Validator.isEmpty(password)) {
      errors.password = "Password is required";
   } else if (!Validator.isLength(password, { min: 6, max: 30 })) {
      errors.password = "Password must be at least 6 characters";
   }

   return {
      errors,
      isValid: isEmpty(errors)
   };
};