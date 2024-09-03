const express = require("express")
const router = express.Router()
const {getAllPosts,createPost,findPostByID,deletePost,updatePost} = require("./controller")
router.get("/",getAllPosts);
router.post("/",createPost);
router.get("/:id",findPostByID);
router.delete("/:id",deletePost);
router.patch("/:id",updatePost);





module.exports = router;