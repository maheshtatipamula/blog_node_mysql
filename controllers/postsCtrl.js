const db = require("../config/dbConnect");
const asyncHandler = require("express-async-handler");

//getposts

const getPosts = asyncHandler(async (req, res) => {
  const q = req.query.category
    ? "SELECT * FROM posts WHERE category=?"
    : "SELECT * FROM posts";
  db.query(q, [req.query.category], async (err, data) => {
    if (err) return res.send(err);

    return res.status(200).json(data);
  });
});

//getpost

const getPost = asyncHandler(async (req, res) => {
  const q =
    "SELECT `username`,`title`,`description`,p.img as postImage,u.img as userImage, p.userid as userId,p.id as postId,`category`,`date` FROM users u JOIN posts p ON u.id=p.userid WHERE p.id=?";
  db.query(q, [req.params.id], async (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data[0]);
  });
});

//myblogs

const getMyBlogs = asyncHandler(async (req, res) => {
  const id = req.userId;
  // Get user ID from request params

  // Get category from request params
  const category = req.params.category;

  let sqlQuery = "SELECT * FROM blog.posts WHERE userid = ?";
  const params = [id];

  // Check if category is provided
  if (category !== undefined) {
    sqlQuery += " AND category = ?";
    params.push(category);
  }
  db.query(sqlQuery, params, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
  const q = req.query.category
    ? "SELECT * FROM posts WHERE category=? WHERE userid=?"
    : "SELECT * FROM posts WHERE userid=?";
  db.query(q, [req.query.category, id], (err, data) => {});
});

const addImage = asyncHandler(async (req, res) => {
  const file = req.file;
  return res.json(file.filename);
});

//add post

const addPost = asyncHandler(async (req, res) => {
  const userId = req.userId;

  const q =
    "INSERT INTO posts(`title`,`description`,`img`,`category`,`userid`) VALUES(?)";
  const values = [
    req.body.title,
    req.body.description,

    req.body.img,
    req.body.category,
    userId,
  ];

  db.query(q, [values], async (err, data) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.json(data);
    }
  });
});

const editPost = asyncHandler(async (req, res) => {
  const userId = req.userId;

  const q =
    "UPDATE posts SET `title`=?,`description`=?,`img`=?,`category`=? WHERE `id` = ? AND `userid` = ?";
  const values = [
    req.body.title,
    req.body.description,

    req.body.img,
    req.body.category,

    req.params.id,
    userId,
  ];

  db.query(q, [...values], async (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json("post have been updated");
    }
  });
  //   const updatePost = (req, res) => {
  //     const token = req.cookies.access_token;
  //     if (!token) return res.status(401).json("Not authenticated!");
  //     jwt.verify(token, "jwtkey", (err, userInfo) => {
  //       if (err) return res.status(403).json("Token is not valid!");
  //       const postId = req.params.id;
  //       const q =
  //         "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";
  //       const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];
  //       db.query(q, [...values, postId, userInfo.id], (err, data) => {
  //         if (err) return res.status(500).json(err);
  //         return res.json("Post has been updated.");
  //       });
  //     });
  //   };
});
const deletePost = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const postId = req.params.id;
  const q = "DELETE FROM posts WHERE `id`=? AND `userid`=?";
  db.query(q, [postId, req.userId], async (err, data) => {
    if (err) return res.status(403).json("You Can Delete Only your Post");

    return res.json("Post had been Deleted");
  });
});

module.exports = {
  getPosts,
  getPost,
  getMyBlogs,
  addImage,
  addPost,
  editPost,
  deletePost,
};
