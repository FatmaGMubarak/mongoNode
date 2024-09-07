const { JsonWebTokenError } = require("jsonwebtoken");
const User = require("./model");
const bycrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
exports.register = async (req,res,next) =>{
const {name,email,password} = req.body
try{
    const hashedPassword = await bycrypt.hashSync(password,10)
    const newUser =await User.create({
        name,
        email,
        password:hashedPassword
    })
    res.status(201).json({msg:"User is created Successfully", user: newUser})
}catch(e){
    next(e);
}
}


exports.login = async (req,res,next) =>{
    const {email,password} = req.body
    try{
        const user = await User.findOne({email}).select("+password")
        if(!user) res.status(400).json({msg:"Invalid Email or Password"})
            if(user){
                const matchedPassword = bycrypt.compareSync(password,user.password)
                if(matchedPassword){
                    const token = await jwt.sign({user_id:user._id},process.env.JWT_KEY);
                    res.status(201).json({msg:"User is successfully logged in",
                        token
                    })
                }else
                {
                    res.status(400).json({msg:"Invalid Email or Password"})
                }
            }
    }catch(e){
        next(e);
    }
}

exports.listAllUsers = async (req,res,next)=>{
    try{
        const users = await User.find();
        res.status(201).json({data:users})
    }catch(e){
        next(e)
    }
}