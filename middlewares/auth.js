const jwt = require("jsonwebtoken");
const RegisteredUsers = require("../model/userSchema");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    const auth = jwt.verify(token, "secret", (err, Dtoken) => {
      if (err) {
        res.status(400).redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.status(400).redirect("/login");
  }
};

const checkUser = (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "secret", async (err, dToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        const user = await RegisteredUsers.findById(dToken.id);
        res.locals.user = user;
        next();
      }
    });
  }else {
      res.locals.user = null
      next();
  }
};

module.exports = { requireAuth, checkUser }; // authentication middleware done!
