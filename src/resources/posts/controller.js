const Post = require("./model");
const { post } = require("./routes");

exports.getAllPosts = async (req,res,next)=>{
    try{
        const posts = await Post.find().populate({path:"user_id",select:"name"});
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
            tags,
            user_id:req.user_id
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
        const post =await Post.findById(id)
        res.status(200).json({data:post})
    }catch(e){
        next(e)
    }
}


exports.deletePost = async (req,res,next)=>{
    const id = req.params.id;
    try{
        const post = await Post.findByIdAndDelete(id)
        if(req.user_id !== post.user_id.toString()){
            res.status(400).json({msg:"Cannot do this action"})
        }
        res.status(200).json({msg:"The post has been deleted successfully"})
    }catch(e){
        next(e)
    }
}

exports.updatePost = async (req,res,next)=>{
    const id = req.params.id;
    const {title,body,tags} = req.body;
    try{
        const post = await Post.findById(id);
        if(req.user_id !== post.user_id.toString()){
            res.status(400).json({msg:"Cannot do this action"})
            return
        }
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