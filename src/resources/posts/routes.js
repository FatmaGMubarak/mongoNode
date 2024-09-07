const express = require("express")
const router = express.Router()
const {getAllPosts,createPost,findPostByID,deletePost,updatePost} = require("./controller")

const{checkAuth} = require("../users/middleware")

router.get("/",getAllPosts);
router.post("/",checkAuth,createPost);
router.get("/:id",findPostByID);
router.delete("/:id",[checkAuth],deletePost);
router.patch("/:id",[checkAuth],updatePost);

module.exports = router;