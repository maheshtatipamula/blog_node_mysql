const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const isAuthenticated = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, "jwtkey");

        req.userId = decoded.id;
        next();
      }
    } catch (err) {
      res.status(400).json("not authorized ");
    }
  } else {
    return res.status(400).json("No TOKEN present");
  }
  // console.log(access_token);
  // if (!access_token) return res.json("No Access Token Present");
  // jwt.verify(access_token, "jwtkey", (err, user) => {
  //   if (err) return res.status(403).json("Token is Not Valid");
  // });
  // req.user = user;
});

module.exports = isAuthenticated;
