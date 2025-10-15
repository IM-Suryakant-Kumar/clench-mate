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
exports.deletePost = exports.updatePost = exports.getPost = exports.getPosts = exports.createPost = void 0;
const middlewares_1 = require("../middlewares");
const models_1 = require("../models");
exports.createPost = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield models_1.Post.create(Object.assign({ author: req.userId }, req.body));
    res.status(200).json({ post });
}));
exports.getPosts = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield models_1.Post.find().populate(["author", "likes", "saves"]);
    res.status(200).json({ posts });
}));
exports.getPost = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield models_1.Post.findById(req.params.id).populate([
        "author",
        "likes",
        "saves",
    ]);
    res.status(200).json({ post });
}));
exports.updatePost = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield models_1.Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(200).json({ post });
}));
exports.deletePost = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted Successfully." });
}));
