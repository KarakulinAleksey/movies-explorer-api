const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const { JWT_TOKEN } = require('../configs/token-key');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  // console.log('auth req.cookies.jwt', req.cookies.jwt);
  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_TOKEN);
    // console.log('authPayload', payload);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;
  next();
  return true;
};
