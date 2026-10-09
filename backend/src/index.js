import express from "express";
import dotenv from "dotenv";
import cors from'cors';
import cookieParser from "cookie-parser";
import connectDB from "./util/db.js";
import {router} from "./routes/userRouter.js";
import {propertyRouter}from "./routes/propertyRouter.js";
import{bookingRouter}from "./routes/bookingRouter.js";
import { tripRouter } from "./routes/tripRouter.js";



dotenv.config();


const app=express();
app.use(express.json({limit:"100mb"}));
app.use(express.urlencoded({limit:"100mb",extended:true}));
app.use(cookieParser());

app.use(cors({
    origin:process.env.ORIGIN_ACCESS_URL,
    credentials:true
}))


const PORT=process.env.PORT;



app.get("/",(req,res)=>{
    res.send("Homley Hub server is running");
})

app.use("/api/v1/rent/user",router);
app.use("/api/v1/rent/listing",propertyRouter);
app.use("/api/v1/rent/user/booking", bookingRouter);
app.use("/api/v1/rent/trip", tripRouter);

connectDB();

app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`);

}) 