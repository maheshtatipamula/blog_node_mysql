const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../config/dbConnect");

//register

const register = asyncHandler(async (req, res) => {
  //  CHECK USER EXIST

  const { username, email, password } = req.body;

  const q = "SELECT * FROM users WHERE username=? OR email=? ";
  db.query(q, [username, email], async (err, data) => {
    if (err) return res.status(400).json(err);
    if (data.length) return res.status(409).json("user already exists");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values = [username, email, hashedPassword];
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has Been Created");
    });
  });
});

const login = asyncHandler(async (req, res) => {
  const { username } = req.body;

  // CHECK USER
  const q = "SELECT * FROM users WHERE   username=?";
  db.query(q, [username], async (err, data) => {
    if (err) return res.status(400).json(err);

    if (data.length === 0) return res.status(404).json("User Not Found");
    //CHECK PASSWORD
    const isPasswordMatched = await bcrypt.compare(
      req.body.password,
      data[0].password
    );
 

    if (!isPasswordMatched)
      return res.status(400).json("Wrong Username or Password");
    const token = jwt.sign({ id: data[0].id }, "jwtkey", { expiresIn: "1d" });
    const { password, ...others } = data[0];
    res.status(200).json({ others, json_token: token });
  });
});

const logout = asyncHandler(async (req, res) => {});

module.exports = { register, login, logout };
