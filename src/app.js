const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();
const {validateSignUp}=require('./utils/validate');
const bcrypt=require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt=require('jsonwebtoken')
const {userAuth}=require("./middleware/auth");
const user = require('./models/user');

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
   
    try {
         //validating data email and password
         validateSignUp(req);

        const {firstName,lastName,emailId, password}=req.body;
         //Encrypt password
        const passwordHash= await bcrypt.hash(password,10);
        console.log(passwordHash);
         //creating new instance of user model
         const user = new User({
            firstName,
            lastName,
            password:passwordHash, 
            emailId
         });
        await user.save();
        res.send("User data added successfully...");
    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) throw new Error("invalid credentials");

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) throw new Error("password not valid");

    const token = await user.getJWT();
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.send("login successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});


app.get("/profile", userAuth, async (req,res)=>{
    try {
    const user=req.user;

    res.send(user) 
    } catch (err) {
        res.status(400).send("ERROR:"+ err.message)
    }
})

app.post("/sendConnectionRequest", userAuth, async (req,res)=>{

      const user=req.user;
    //sending the connect request
    console.log('sending connection request');

    res.send(user.firstName + " send the connection request!")
    

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
