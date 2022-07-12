const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { users } = require("../db");
var { Sequelize } = require("sequelize");
var bodyParser = require("body-parser");
const db = require("../db");
const { application } = require("express");

// SIGNUP
router.post(
  "/signup",
  [
    check("email", "Please input a valid email").isEmail(),
    check(
      "password",
      "Please input a password with a min length of 6"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const { password, email } = req.body;
   

    // Validate the inputs
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    // Validate if the user doesnt already exist;
    let user = await users.findOne({ where: { email: email } });
    if (user) {
      return res.status(422).json({
        errors: [
          {
            msg: "This user already exists",
          },
        ],
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    // Save the password into the db
    users.create({
      email,
      password: hashedPassword,
    });

    const token = await JWT.sign(
      { email },
      "nfb32iur32ibfqfvi3vf932bg932g932",
      { expiresIn: 360000 }
    );

    res.json({
      token,
    });
  }
);

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if user with email exists
  let user = await users.findOne({ where: { email: email } });

  if (!user) {
    return res.status(422).json({
      errors: [
        {
          msg: "Invalid Credentials users",
        },
      ],
    });
  }

  // Check if the password if valid
  let isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(404).json({
      errors: [
        {
          msg: "Invalid Credentials ",
        },
      ],
    });
  }

  // Send JSON WEB TOKEN
  const token = await JWT.sign({ email }, "nfb32iur32ibfqfvi3vf932bg932g932", {
    expiresIn: 360000,
  });

  res.json({
    token,
  });
});



module.exports = router;
