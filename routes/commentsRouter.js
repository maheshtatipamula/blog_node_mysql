const express = require("express");
const {
  addComment,
  getComments,
  editComment,
  deleteComment,
} = require("../controllers/commentsCtrl");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.post("/new-comment", isAuthenticated, addComment);
router.get("/all-comments/:id", isAuthenticated, getComments);
router.put("/edit-comment/:id", isAuthenticated, editComment);
router.delete("/delete-comment/:id", isAuthenticated, deleteComment);

module.exports = router;
