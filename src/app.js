const express=require('express');

const app=express();

// This will handle only get call to /user
app.get('/user',(req,res)=>{
res.send({firstName:'deepthi',lastName:'H'})
})

 
app.post('/user',(req,res)=>{
     console.log('The maruthi data successfully sended');
     
    res.send('i can able to fetch the data successfully')
})

// IF we use it will match all the http method api calls to /test
app.use("/hello",(req,res)=>{
    res.send('How are You hemanth!  Hope you are Doing GOOD');
    
})


app.use("/user",(req,res)=>{
    res.send("Hello,Hemanth!")
 })



app.listen(8008,()=>{
    console.log("The server is successfully listening on the port 8008...");
    
})
