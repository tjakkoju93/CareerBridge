const validator = require("validator");

const checkValidations = (userDetails) => {
  const options = {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  };

  console.log(
    validator.isEmpty(userDetails.firstName) 
  );
  // console.log(validator.isLength(userDetails.lastName, [{ min: 5, max: 50 }]))
  if (!validator.isEmail(userDetails.email)) {
    throw Error("Enter a valid email");
  } else if (!validator.isStrongPassword(userDetails.password, [options])) {
    throw Error("Enter a valid password");
  } else if (
    !validator.isLength(userDetails.firstName, [{ min: 5, max: 50 }]) &&
    !validator.isLength(userDetails.lastName, [{ min: 5, max: 50 }])
  )
    throw Error("Enter a valid data");

  return true;
};

module.exports = checkValidations;
