const express = require("express");
const Blog = require("../model/blogSchema");
const { requireAuth } = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./upload",
  filename: function (req, file, cb) {
    console.log(
      "File Name is saved as",
      new Date().toISOString().replace(/:/g, "-") + file.originalname
    );
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 11 },
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Type not supported"));
    }
  },
});

// Error handling
const handleError = (err) => {
  let errors = {msg: 'Post not submitted failed at server check info!---->', title: "", body: "" };

  if (err.message.includes("Blog validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// Route protection function or middleware! ("requireAuth")
router.get("/create", requireAuth, (req, res) => {
  res.render("create");
});

router.post("/create", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const image = req.file.path;
  const { title, author, body, link } = req.body;
  console.log('this is the link / URL from the form',link)

  try {
    const blog = await Blog.create({ picture: image, title, author, body, link });
    blog
      ? res.status(200).redirect("/")
      : res.status(400).send("error creating post!");
  } catch (err) {
    const errors = handleError(err);
    console.log(errors);
    res.status(400).send(JSON.stringify(errors));
  }
});

router.get("/posts/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const post = await Blog.findById(id);
    res.render("post", { post });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/blog/:id", async (req, res) => {
  let id = req.params.id;

  try {
    const blog = await Blog.findByIdAndDelete(id);
    console.log(blog);
    res.status(200).json({ redirect: "/" });
  } catch (err) {
    console.log(err);
    res.status(400);
  }
});

router.post("/comments/:id", async (req, res) => {
  let id = req.params.id;
  let comment = { body: req.body.comment };
  console.log(comment);

  try {
    const blog = await Blog.findByIdAndUpdate(
      id,
      { $push: { comments: comment } },
      {
        new: true,
      }
    );
    res.status(200).redirect(`/posts/${id}`);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/comments/:postId/:commentId", async (req, res) => {
  let postId = req.params.postId;
  let commentId = req.params.commentId;

  try {
    const post = await Blog.findByIdAndUpdate(
      postId,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );
    console.log(post);
    res.status(200).json({ redirect: `/posts/${postId}` });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
