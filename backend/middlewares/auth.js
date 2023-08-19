const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authError');

const { JWT_SECRET = 'strong-secret-key' } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  const bearer = 'Bearer ';

  if (!authorization || !authorization.startsWith(bearer)) {
    throw new AuthError('Сначала авторизируйтесь');
  }

  const token = authorization.replace(bearer, '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthError('Требуется авторизация');
  }

  req.user = payload;

  next();
};

module.exports = auth;
