import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import {
	authenticateUser,
	errorHandlerMiddleware,
	notFoundMiddleware,
} from "./middlewares";
import {
	authRouter,
	commentRouter,
	likeRouter,
	postRouter,
	saveRouter,
	userRouter,
} from "./routes";
import { connectDB } from "./db";
import path from "path";

// constants
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./assets")));
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

// routes
app.use("/auth", authRouter);
app.use("/user", authenticateUser, userRouter);
app.use("/post", authenticateUser, postRouter);
app.use("/comment", authenticateUser, commentRouter);
app.use("/like", authenticateUser, likeRouter);
app.use("/save", authenticateUser, saveRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

(async () => {
	try {
		await connectDB(MONGO_URI!);
		app.listen(PORT, () =>
			console.log(`App is running on http://localhost:${PORT}`)
		);
	} catch (error) {
		console.error(error);
	}
})();

export default app;
