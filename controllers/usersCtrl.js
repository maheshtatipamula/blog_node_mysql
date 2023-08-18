const db = require("../config/dbConnect");
const asyncHandler = require("express-async-handler");

const getUserdDetails = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const q = "SELECT `id`,`username` FROM users WHERE id=? ";
  db.query(q, [userId], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data[0]);
  });
});

module.exports = { getUserdDetails };
