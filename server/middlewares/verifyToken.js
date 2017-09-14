const jwt = require('jsonwebtoken');

async function verifyToken(req) {
  const token = req.headers.authorization;
  if (token) {
    try {
      const { user } = await jwt.verify(token, process.env.SECRET);
      req.user = user;
    } catch (errors) {
      console.error(errors);
      req.user = null;
    }
  }
  req.next();
}

module.exports = verifyToken;
