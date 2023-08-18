const db = require("../config/dbConnect");
const asyncHandler = require("express-async-handler");

//add comment

const addComment = asyncHandler(async (req, res) => {
  const userId = req.userId;
  //
  const q = "INSERT INTO comments(`comment`,`post_id`,`user_id`) VALUES(?)";
  const values = [req.body.comment, req.body.postId, userId];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(400).json(err);
    return res.json("Comment has Been Created");
  });
});

//get comment

const getComments = asyncHandler(async (req, res) => {
  const q =
    "SELECT c.id as commentId,`comment`,`post_id`,`user_id`,c.date as postedTime,u.username as nameOfUser,u.id as UserId FROM comments c JOIN users u ON c.user_id=u.id WHERE post_id=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(data);
  });
});

//dedit  coment

const editComment = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const comment = req.body;
  const q = "UPDATE comments SET `comment` WHERE `id`=? AND `user_id`=? ";
  db.query(q, [comment, req.params.id, userId], (err, data) => {
    if (err) return res.status(400).json(err);
    return res.json("Post has Been Updated");
  });
});

//delete comment

const deleteComment = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const q = "DELETE  FROM comments WHERE id=? AND user_id=?";
  db.query(q, [req.params.id, userId], (err, data) => {
    if (err) return res.status(400).json(err);
    return res.json("deleted ");
  });
});

module.exports = { addComment, getComments, editComment, deleteComment };
