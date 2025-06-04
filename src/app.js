const express=require('express');
const connectDB=require('./config/database')
const app=express();
const User=require("./models/user")

app.post("/signup",async(req,res)=>{
    const user= new User ({
        firstName:"maruthi",
        lastName:"N",
        emailId:"maruthigowda@gmail.com",
        password:"maruthi@123"
    });
try{
    await user.save();
    res.send("user data added successfully....")
}catch(err){
     res.status(400).send("error saving the data:"+ err.message)
}
    
})







connectDB()
.then(()=>{
console.log("Database connection established....");
app.listen(8008,()=>{
    console.log("The server is successfully listening on the port 8008....");
    
})
})
.catch(()=>{
console.log("Database connot be connected");

})
