require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const generateOTP = require("./utils/generateOTP");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middlewares/authMiddleware");
const todoRoutes = require("./routes/todoRoutes");
const cors = require("cors");

const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
const startServer = async ()=>{
    try{
        await connectDB();

        app.listen(PORT, ()=>{
            console.log(`Server is running on ${PORT}`);
        });
    }catch(err){
        console.log(err);
    }
};
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.get("/", (req, res)=>{
    res.send("Server is Running");

});

app.get("/api/test", authMiddleware, (req, res)=>{
    res.json({
        success : true,
        message : "Protected Route Accessed Successfully",
        user : req.user,
    });
});


startServer();