const adminAuth=(req,res,next)=>{
    const token='Deepu';
    const isAdminAuthorized=token==='Deepu';
    if(!isAdminAuthorized){
        res.status(401).send("unAuthorized Request")
    }else{
        next();
    }
}

const userAuth=(req,res,next)=>{
    console.log("logging all the user data");
    const token='maruthi';
    const isUserAuthorized=token==='maruthi';
    if(!isUserAuthorized){
        res.status(401).send('unauthorized user')
    }else{
        next();
    }
    
}

module.exports={adminAuth,userAuth}