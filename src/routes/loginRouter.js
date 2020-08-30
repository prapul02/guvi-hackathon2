const express = require("express");
const Admin = require("../models/admin");
const { compareHash } = require("../utils/hash");
const { sign } = require("../utils/jwtService");
require("../config/dbConfig");
const { findByProp  } = require("../dbSeeder/adminSeed")

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  const result = await findByProp(email);
  const admin = result;
  console.log(admin)
  if (admin) {
    console.log(password);
    const isValidPassword = compareHash(password, admin.password);
    if (isValidPassword && admin.email=="admin@gmail.com") {
      const token = sign({
        sub: "admin",
        email
      });
      res.cookie("jwt", token, { httpOnly: true });
      res.status(200).json({
        message: "Valid Admin!"
      });
    }else if(isValidPassword && admin.email != "admin@gmail.com"){
      const token = sign({
        sub: "user",
        email
      });
      res.cookie("jwt", token, { httpOnly: true });
      res.status(200).json({
        message: "Valid User!"
      });
    } else {
      res.status(401).send("Invalid User");
    }
  } else {
    res.status(401).send("Invalid User");
  }
});

module.exports = loginRouter;
