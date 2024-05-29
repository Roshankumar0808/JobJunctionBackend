import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import applicationRouter from './routes/applicationRouter.js'
import userRouter from './routes/userRouter.js'
import jobRouter from './routes/jobRouter.js'
import {dbConnection} from './database/dbConnection.js'
const app=express();
dotenv.config({path:"./config/config.env"});

app.use(cors({
    origin:[process.env.FRONTENT_URL],
    methods:["GET","POST","DELETE","PUT"],
    credentials:true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({exteneded:true}));

app.use(
    fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
})
);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/job',jobRouter);
app.use('/api/v1/application',applicationRouter);

dbConnection();
export default app;
//37min backend