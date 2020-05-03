const HttpError = require("../util/http-error");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Authorization: 'Bearer Token'
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new HttpError("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, "jeffrey_secret_key");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    return next(new HttpError("Authentication failed!", 401));
  }
};
