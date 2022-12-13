const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["auth-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    if (decoded.mainAdmin_id) {
      console.log("main admin file auth");
      res.locals.user_id = decoded.mainAdmin_id;
      res.locals.name = decoded.name;

    } else if (decoded.admin_id) {
      console.log("admin file auth");
      res.locals.user_id = decoded.admin_id;
      res.locals.name = decoded.name;
    }

    // res.locals.user_id = decoded.mainAdmin_id;
    // console.log("decode = ......................");
    // console.log(decoded);
    // console.log(res.locals);
    return next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

};

module.exports = verifyToken;