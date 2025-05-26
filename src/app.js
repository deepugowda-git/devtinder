const express=require('express');

const app=express();

// app.use("/",(req,res)=>{
//     res.send("Hello I starting my server at /")
// })

app.use("/hello",(req,res)=>{
    res.send('How are You hemanth!  Hope you are Doing GOOD');
    
})


app.use("",(req,res)=>{
    res.send("Hello,Hemanth!")

})

app.listen(8008,()=>{
    console.log("The server is successfully listening on the port 8008...");
    
})
