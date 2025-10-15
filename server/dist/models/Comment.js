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
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const _1 = require(".");
const commentSchema = new mongoose_1.Schema({
    content: { type: String, required: true },
    post: { type: String, ref: "Post", required: true },
    author: { type: String, ref: "User", required: true },
}, { timestamps: true });
commentSchema.post("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield _1.User.findByIdAndUpdate(this.author, { $push: { comments: this._id } });
        yield _1.Post.findByIdAndUpdate(this.post, { $push: { comments: this._id } });
    });
});
commentSchema.post("findOneAndDelete", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc) {
            yield _1.User.findByIdAndUpdate(doc.author, { $pull: { comments: doc._id } });
            yield _1.Post.findByIdAndUpdate(doc.post, { $pull: { comments: doc._id } });
        }
    });
});
exports.Comment = (0, mongoose_1.model)("Comment", commentSchema);
