const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authError');

const { NODE_ENV } = process.env;
const { JWT_SECRET = 'strong-secret-key' } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new AuthError('Требуется авторизация');
  }
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'strong-secret-key');
  } catch (err) {
    throw new AuthError('Требуется авторизация');
  }

  req.user = payload;

  next();
};

module.exports = auth;
