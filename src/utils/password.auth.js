const checkPasswordValidation = value => {
  const isWhitespace = /^(?=.*\s)/;
  if (isWhitespace.test(value)) {
    return [false, 'Password must not contain Whitespaces.'];
  }

  const isContainsUppercase = /^(?=.*[A-Z])/;
  if (!isContainsUppercase.test(value)) {
    return [false, 'Password must have at least one Uppercase Character.'];
  }

  const isContainsNumber = /^(?=.*[0-9])/;
  if (!isContainsNumber.test(value)) {
    return [false, 'Password must contain at least one Digit.'];
  }

  // const isContainsSymbol =
  //   /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
  // if (!isContainsSymbol.test(value)) {
  //   return "Password must contain at least one Special Symbol.";
  // }

  const isValidLength = /^.{6,10}$/;
  if (!isValidLength.test(value)) {
    return [false, 'Password must be 6-10 Characters Long.'];
  }
  return [true];
};

export default checkPasswordValidation;
