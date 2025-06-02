const express=require('express');

const app=express();

const {adminAuth,userAuth} = require( './middleware/auth')

app.use('/admin',adminAuth);
app.use('/user',userAuth)

app.get("/admin/getAllData",(req,res)=>{
    res.send("all the data send")
})
app.get("/admin/deleteAllUser",(req,res)=>{
    res.send("deleted all the user")
})

app.get("/user/getAllData",(req,res)=>{
    res.send("send all user data")
})
app.listen(8008,()=>{
    console.log("The server is successfully listening on the port 8008....");
    
})
