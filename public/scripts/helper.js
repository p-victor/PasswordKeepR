const verifyLoginInfo = (email ,password, user) => {
  return !!(email && password && user.email === email && user.password === password);
};
const verifyRegisterInfo = (email, password, user) => {
  return !!(email && password && email.length <= 255 && password.length <= 255, !user);
}

module.exports = {
  verifyLoginInfo,
  verifyRegisterInfo
}
