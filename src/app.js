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
