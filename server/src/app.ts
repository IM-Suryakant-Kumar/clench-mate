import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandlerMiddleware, notFoundMiddleware } from "./middlewares";
import { authRouter } from "./routes";
import { connectDB } from "./db";

// constants
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

// middlewares
app.use(express.json());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

// routes
app.use("/auth", authRouter);

// strict middleware
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
