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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const mongoose_2 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, minlength: 3, required: true },
    username: { type: String, minlength: 3, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, minlength: 3, required: true, select: false },
    banner: { type: String },
    avatar: { type: String },
    website: { type: String },
    bio: { type: String },
    state: { type: String },
    city: { type: String },
    school: { type: String },
    work: { type: String },
    followers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    followings: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Post" }],
    likes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Like" }],
    saves: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Save" }],
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Comment" }],
}, { timestamps: true });
userSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return;
        const salt = yield (0, bcryptjs_1.genSalt)(10);
        this.password = yield (0, bcryptjs_1.hash)(this.password, salt);
    });
});
userSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, bcryptjs_1.compare)(candidatePassword, this.password);
    });
};
userSchema.methods.createJWTToken = function () {
    return (0, jsonwebtoken_1.sign)({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};
exports.User = (0, mongoose_2.model)("User", userSchema);
