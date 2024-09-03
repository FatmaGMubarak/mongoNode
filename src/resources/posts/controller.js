const Post = require("./model")

exports.getAllPosts = async (req,res,next)=>{
    try{
        const posts = await Post.find();
        res.status(200).json({
            data:posts
        })
    }catch(e){
        next(e)
    }
}


exports.createPost = async (req,res,next) =>{
    const {title,body,tags} = req.body;
    try{
        const newPost = await Post.create({
            title,
            body,
            tags
        });
        res.status(201).json({
            msg:"A new post is added",
            data:newPost
        })
    }catch(e){
        next(e)
    }
}

exports.findPostByID = async (req,res,next)=>{
    const id = req.params.id;
    try{
        const post = Post.findById(id)
        res.status(200).json({data:post})
    }catch(e){
        next(e)
    }
}


exports.deletePost = async (req,res,next)=>{
    const id = req.params.id;
    try{
        await Post.findByIdAndDelete(id)
        res.status(200).json({msg:"The post has been deleted successfully"})
    }catch(e){
        next(e)
    }
}

exports.updatePost = async (req,res,next)=>{
    const id = req.params.id;
    const {title,body,tags} = req.body;
    try{
        const updatedPost = await Post.findByIdAndUpdate(id,{
            title,body,tags
        },{new:true})
        res.status(200).json({msg:"The post has been updated successfully",
            data:updatedPost
        })
    }catch(e){
        next(e)  
      }
}