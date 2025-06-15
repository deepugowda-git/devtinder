const jwt = require('jsonwebtoken');
const User=require("../models/user")

const userAuth= async(req,res,next)=>{
try{
    const cookies=req.cookies;
   const {token}=cookies;

   console.log(token);
   let cleanToken = token;
    if (cleanToken.startsWith('"') && cleanToken.endsWith('"')) {
      cleanToken = cleanToken.slice(1, -1);
    }
   const decodedObj = jwt.verify(cleanToken, "DEV@Tinder$790");

   const {_id}=decodedObj;

 const user = await User.findById(_id);
 if(!user){
    throw new Error("user not found");
 }
 req.user=user;
 next();
}catch(err){
    console.error('Auth error:', err);
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).send('Token expired');
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).send('Invalid token');
    }
    return res.status(400).send('Error: ' + err.message);
  }
};


module.exports={userAuth}