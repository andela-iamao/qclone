const jwt = require('jsonwebtoken');

function signToken(values, SECRET, expiresIn='1h') {
  return jwt.sign(
    { user: values },
    SECRET,
    { expiresIn }
  );
}

module.exports = {
  signToken
};
