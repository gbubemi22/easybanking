import "express-async-errors";
import * as dotenv from 'dotenv'
dotenv.config();
import express from 'express';
const app = express();



  //pcakeges
import cors from "cors";
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import rateLimiter from "express-rate-limit";
import helmet from "helmet";
import xss from "xss-clean";

import connectDB from './DB/connect.js'
import authRouter from './router/authRouter.js';


app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser(process.env.JWT_COOKIE));
app.use(bodyParser.urlencoded({ extended: true }))


app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get("/", (req, res) => {
     res.json({ message: "Welcome your Banking APP" });

});


//USE ROUTES

app.use('/api/v1/auth',authRouter);


//ErrorHandlerMiddleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

app.set("trust proxy", 1);
app.use(
     rateLimiter({
          windowMs: 15 * 60 * 1000,
          max: 60,
     })
);
app.use(helmet());
app.use(xss());


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


//port
const port = process.env.PORT || 9000;


const start = async () => {
     try {
       await connectDB(process.env.MONGO_URI);
       app.listen(port, () => {
         console.log(`listing on port ${port}...`);
       });
     } catch (error) {
       console.log(error);
     }
   };
   
   start();
