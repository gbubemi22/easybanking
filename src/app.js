import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();

//pcakeges
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import rateLimiter from "express-rate-limit";
import helmet from "helmet";
import xss from "xss-clean";

import connectDB from "./DB/connect.js";
import authRouter from "./router/authRouter.js";
import userRouter from "./router/userRouter.js";
import walletRouter from "./router/walletRouter.js";
import transactionRouter from "./router/transactionRouter.js";

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser(process.env.JWT_COOKIE));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome your Banking APP" });
});

//USE ROUTES

app.use(authRouter, userRouter, walletRouter, transactionRouter);
//app.use(userRouter)

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
