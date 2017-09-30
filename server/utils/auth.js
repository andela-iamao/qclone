const jwt = require('jsonwebtoken');

function signToken(values, SECRET, expiresIn='24h') {
  return jwt.sign(
    { user: values },
    SECRET,
    { expiresIn }
  );
}

module.exports = {
  signToken
};
