"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const middlewares_1 = require("./middlewares");
const routes_1 = require("./routes");
const db_1 = require("./db");
// constants
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;
const MONGO_URI = process.env.MONGO_URI;
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: CLIENT_URL, credentials: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
// routes
app.use("/auth", routes_1.authRouter);
app.use("/user", middlewares_1.authenticateUser, routes_1.userRouter);
app.use("/post", middlewares_1.authenticateUser, routes_1.postRouter);
app.use("/comment", middlewares_1.authenticateUser, routes_1.commentRouter);
app.use("/like", middlewares_1.authenticateUser, routes_1.likeRouter);
app.use("/save", middlewares_1.authenticateUser, routes_1.saveRouter);
app.use(middlewares_1.notFoundMiddleware);
app.use(middlewares_1.errorHandlerMiddleware);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectDB)(MONGO_URI);
        app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));
    }
    catch (error) {
        console.error(error);
    }
}))();
