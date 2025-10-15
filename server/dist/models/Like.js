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
exports.Like = void 0;
const mongoose_1 = require("mongoose");
const _1 = require(".");
const likeSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
likeSchema.post("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield _1.User.findByIdAndUpdate(this.user, { $push: { likes: this._id } });
        yield _1.Post.findByIdAndUpdate(this.post, { $push: { likes: this._id } });
    });
});
likeSchema.post("findOneAndDelete", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc) {
            yield _1.User.findByIdAndUpdate(doc.user, { $pull: { likes: doc._id } });
            yield _1.Post.findByIdAndUpdate(doc.post, { $pull: { likes: doc._id } });
        }
    });
});
exports.Like = (0, mongoose_1.model)("Like", likeSchema);
