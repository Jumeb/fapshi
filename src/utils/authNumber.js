const AuthNumber = string => [...string].every(c => '0123456789'.includes(c));

const AuthMTN = string => {
  if (/^[6]([7|8][\d]{7}|[5][0-4][\d]{6})$/.test(string)) {
    return true;
  }
  return false;
};

const AuthOrange = string => {
  if (/^[6]([9][\d]{7}|[5][5-9][\d]{6})$/.test(string)) {
    return true;
  }
  return false;
};

export {AuthNumber, AuthMTN, AuthOrange};
