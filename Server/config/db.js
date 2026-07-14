const mongoose = require("mongoose");

const connectDB = async ()=>{
    try{
        const con = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB Connected : ${con.connection.host}`);
    }catch(err){
        console.log("Databse Conncetion Failed");
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;