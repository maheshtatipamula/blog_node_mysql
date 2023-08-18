const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const { getUserdDetails } = require("../controllers/usersCtrl");
const cloudinary = require("../config/coludinary");
const singleUpload = require("../middleware/multer");

const router = express.Router();
router.get("/getuser", isAuthenticated, getUserdDetails);
router.post("/posttrail", async (req, res) => {
  const { image } = req.body;
  const uploadedImage = await cloudinary.uploader.upload(
    image,
    {
      upload_preset: "unsigned_uploads",
      public_id: `avatar`,
      allowed_formats: ["png", "jpg", "svg", "ico"],
    },
    function (error, result) {
      if (error) {
        return res.json(error);
      }

      res.status(200).json(result);
    }
  );
  try {
    res.status(200).json(uploadedImage);
  } catch (error) {}
});

router.post("/muter", singleUpload);

module.exports = router;
