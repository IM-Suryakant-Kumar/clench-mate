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
Object.defineProperty(exports, "__esModule", { value: true });
exports.unfollowUser = exports.followUser = exports.updateProfile = exports.getProfile = exports.logout = exports.login = exports.signup = void 0;
const middlewares_1 = require("../middlewares");
const errors_1 = require("../errors");
const models_1 = require("../models");
const utils_1 = require("../utils");
exports.signup = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.create(req.body);
    (0, utils_1.sendToken)(res, 201, user, "Signed up successfully.");
}));
exports.login = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        throw new errors_1.BadRequestError("Please provide email and password");
    const user = yield models_1.User.findOne({ email }).select("+password");
    if (!user)
        throw new errors_1.NotFoundError("Invalid credentials");
    const isPasswordValid = yield user.comparePassword(password);
    if (!isPasswordValid)
        throw new errors_1.NotFoundError("Invalid credentials");
    (0, utils_1.sendToken)(res, 200, user, "Logged in successfully.");
}));
exports.logout = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res
        .status(200)
        .clearCookie("token", { httpOnly: true })
        .json({ message: "Logged out successfully." });
}));
exports.getProfile = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findById(req.userId).populate([
        "posts",
        { path: "likes", select: "post", populate: { path: "post" } },
        { path: "saves", select: "post", populate: { path: "post" } },
    ]);
    res.status(200).json({ user });
}));
exports.updateProfile = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findByIdAndUpdate(req.userId, req.body, {
        new: true,
    }).populate([
        "posts",
        { path: "likes", select: "post", populate: { path: "post" } },
        { path: "saves", select: "post", populate: { path: "post" } },
    ]);
    res.status(200).json({ user });
}));
exports.followUser = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.User.findByIdAndUpdate(req.body.followingId, {
        $push: { followers: req.userId },
    });
    const user = yield models_1.User.findByIdAndUpdate(req.userId, {
        $push: { followings: req.body.followingId },
    }, { new: true }).populate([
        "posts",
        { path: "likes", select: "post", populate: { path: "post" } },
        { path: "saves", select: "post", populate: { path: "post" } },
    ]);
    res.status(200).json({ user });
}));
exports.unfollowUser = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.User.findByIdAndUpdate(req.body.followingId, {
        $pull: { followers: req.userId },
    });
    const user = yield models_1.User.findByIdAndUpdate(req.userId, {
        $pull: { followings: req.body.followingId },
    }, { new: true }).populate([
        "posts",
        { path: "likes", select: "post", populate: { path: "post" } },
        { path: "saves", select: "post", populate: { path: "post" } },
    ]);
    res.status(200).json({ user });
}));
