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
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const _1 = require(".");
const postSchema = new mongoose_1.Schema({
    content: { type: String, required: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Like" }],
    saves: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Save" }],
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Comment" }],
}, { timestamps: true });
postSchema.post("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield _1.User.findByIdAndUpdate(this.author, { $push: { posts: this._id } });
    });
});
postSchema.post("findOneAndDelete", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc) {
            yield _1.User.findByIdAndUpdate(doc.author, { $pull: { posts: doc._id } });
            const likes = yield _1.Like.find({ post: doc._id });
            likes.forEach((like) => __awaiter(this, void 0, void 0, function* () {
                yield _1.Like.findByIdAndDelete(like._id);
            }));
            const saves = yield _1.Save.find({ post: doc._id });
            saves.forEach((save) => __awaiter(this, void 0, void 0, function* () {
                yield _1.Save.findByIdAndDelete(save._id);
            }));
            yield _1.Comment.deleteMany({ post: doc._id });
        }
    });
});
exports.Post = (0, mongoose_1.model)("Post", postSchema);
