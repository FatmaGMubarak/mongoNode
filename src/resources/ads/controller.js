const Ads = require("./model");

exports.getAllAds = async (req,res,next)=>{
    try{
        const ads = await Ads.find().populate({path:"user_id",select:"name"});
        res.status(200).json({
            data:ads
        })
    }catch(e){
        next(e)
    }
}


exports.createAd = async (req,res,next) =>{
    const {title,img_url} = req.body;
    try{
        const newAd = await Ads.create({
            title,
            img_url,
            user_id:req.user_id
        });
        res.status(201).json({
            msg:"A new Ad is added",
            data:newAd
        })
    }catch(e){
        next(e)
    }
}

exports.findAdByID = async (req,res,next)=>{
    const id = req.params.id;
    try{
        const ads =await Ads.findById(id)
        res.status(200).json({data:ads})
    }catch(e){
        next(e)
    }
}


exports.deleteAd = async (req,res,next)=>{
    const id = req.params.id;
    try{
        const ads = await Ads.findByIdAndDelete(id)
        if(req.user_id !== ads.user_id.toString()){
            res.status(400).json({msg:"Cannot do this action"})
        }
        res.status(200).json({msg:"The post has been deleted successfully"})
    }catch(e){
        next(e)
    }
}

exports.updateAd = async (req,res,next)=>{
    const id = req.params.id;
    const {title,img_url} = req.body;
    try{
        const ads = await Ads.findById(id);
        if (!ads) {
            res.status(404).json({ msg: "Ad not found" });
            return;
        }
        if(req.user_id !== ads.user_id.toString()){
            res.status(400).json({msg:"Cannot do this action"})
            return
        }
        const updatedAd = await Ads.findByIdAndUpdate(id,{
            title,img_url
        },{new:true})
        res.status(200).json({msg:"The post has been updated successfully",
            data:updatedAd
        })
    }catch(e){
        next(e)  
      }
}