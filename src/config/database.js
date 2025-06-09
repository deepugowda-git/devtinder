const mongoose=require('mongoose');

const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://namastedev:Etdhsl7KHdArlBIL@namastenode.8c5j0cf.mongodb.net/devTinder');
};
module.exports=connectDB;
