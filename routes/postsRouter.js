const express = require("express");
const {
  getPost,
  getPosts,

  addPost,
  editPost,
  deletePost,
  addImage,
  getMyBlogs,
} = require("../controllers/postsCtrl");
const { upload } = require("../middleware/uploadImages");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.get("/all-blogs", isAuthenticated, getPosts);
router.get("/get-blog/:id", isAuthenticated, getPost);
router.get("/my-blogs", isAuthenticated, getMyBlogs);

router.post("/add-photo", upload.single("file"), addImage);
router.post("/add-blog", isAuthenticated, addPost);

router.put("/edit-blog/:id", isAuthenticated, editPost);
router.delete("/delete-blog/:id", isAuthenticated, deletePost);

module.exports = router;
