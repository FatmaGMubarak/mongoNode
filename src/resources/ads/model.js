
const mongoose = require("mongoose")
const adsSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:["true","Please enter the title of your add"],
                },
        img_url:{
            type:String,
            required :["true","Please enter your image link"],
         },
         user_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
         }
    },
    {timestamps:true}
)
const Ads = mongoose.model("Ads",adsSchema);
module.exports = Ads;