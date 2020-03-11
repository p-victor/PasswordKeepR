const bcrypt = require('bcrypt');

const verifyLoginInfo = (email, password, user) => {
  return bcrypt.compare(password, user.password)
    .then(compareResult => !!(email && password && user.email === email && compareResult));
};
const verifyRegisterInfo = (email, password, user) => {
  return !!(email && password && email.length <= 255 && password.length <= 255, email.length >= 1 && password.length <= 1, !user);
}

module.exports = {
  verifyLoginInfo,
  verifyRegisterInfo
}
