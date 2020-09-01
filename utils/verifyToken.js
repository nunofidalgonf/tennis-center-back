const jwt = require('jsonwebtoken');

const authVerify = (req, res, next) => {
  const token = req.header('auth-token');
  if(!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(400).send('Invalid Token');
  }
}

module.exports.verifyToken = authVerify;