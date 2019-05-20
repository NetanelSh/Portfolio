const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const config = require('../config');
const NAMESPACE = config.NAMESPACE;
// Middleware
exports.checkJWT = jwt({
  secret: jwksRsa.expressJwtSecret({
    cahce: true,
    rateLimit: true,
    jwksRequestsPerMinute: 50,
    jwksUri: "https://sheinbinn.auth0.com/.well-known/jwks.json"
  }),
  audience: "khOcfpG6b7atU1yCa5x0gzJWK7FvHcUr",
  issuer: "https://sheinbinn.auth0.com/",
  algorithms: ["RS256"]
});

exports.checkRole = role => (req, res, next) => {
  const user = req.user;

  if (user && user[NAMESPACE + '/role'] && (user[NAMESPACE + '/role'] === role)) {
    next();
  } else {
    return res.status(401).send({ title: 'Not Authorized', details: 'You are not authorized to accesss here.'})
  }
}