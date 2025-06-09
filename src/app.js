const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User data added successfully...");
    } catch (err) {
        res.status(400).send("Error saving the data: " + err.message);
    }
});


//get user by email

app.get("/user",async(req,res)=>{
    const userEmail=req.body.emailId;
try{
const users=await User.findOne({emailId:userEmail});
if(users.length===0){
    res.status(404).send("user not found")
  
}else{
    res.send(users);
}
}catch(err){
    res.status(400).send("somthing went wrong")
}
})


//feed api- get/feed-get all the users from the database 
app.get("/feed",async(req,res)=>{
    try{
       const users=await User.find({});
       res.send(users)
    }catch(err){
         res.status(400).send("somthing went wrong")
    }
});

//delete userId

app.delete("/user",async(req,res)=>{
    const userId=req.body.userId;
    try{
        const user=await User.findByIdAndDelete(userId);
        res.send("User deleted successfully")
    }catch(err){
         res.status(400).send("somthing went wrong")
    }
})

//update data of the user
app.patch("/user/:userId",async(req,res)=>{
    const userId=req.params?.userId;
    const data=req.body;
    try{
        const ALLOWED_UPDATES=["photoUrl","about","gender","age","skills"];

        const isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed){
            throw new Error("update is not allowed")
        }

        if(data?.skills.length>10){
            throw new Error("skills canot be more than 10");
            
        }
        
       const user =await User.findByIdAndUpdate({_id:userId},data, {
            returnDocument:'before',
            runValidators:true,
        });
        console.log(user);
        
       //console.log(user);
       
        res.send("user updated successfully")

    }catch(err){
         res.status(400).send("update failed:"+ err.message)
    }
})




connectDB()
    .then(() => {
        console.log("Database connection established...");
        app.listen(8008, () => {
            console.log("The server is successfully listening on port 8008...");
        });
    })
    .catch((err) => {
        console.log("Database cannot be connected:", err.message);
    });
