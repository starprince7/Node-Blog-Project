const express = require("express");
const { findByIdAndDelete } = require("../model/blogSchema");
const Blog = require("../model/blogSchema");
const { requireAuth } = require("../middlewares/auth");

const router = express.Router();

// Route protection function or middleware! ("requireAuth")
router.get("/create", requireAuth, (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {
  const blogPost = req.body;
  console.log(blogPost);

  try {
    const blog = await Blog.create(blogPost);
    blog
      ? res.status(200).redirect("/")
      : res.status(400).send("error creating post!");
  } catch (err) {
    console.log(err);
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

router.get("/blog", async (req, res) => {
  const fakeBlog = {
    title: "fake News of rex-T",
    author: "Prince",
    body: "body of fake News",
    comments: [{ author: "rex-T", body: "Its rex-T in the building!" }],
  };
  try {
    const blog = await Blog.create(fakeBlog);
    res.status(200).json({ blog });
  } catch (err) {
    console.log(err);
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
