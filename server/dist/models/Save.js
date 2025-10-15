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
exports.Save = void 0;
const mongoose_1 = require("mongoose");
const _1 = require(".");
const saveSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
saveSchema.post("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield _1.User.findByIdAndUpdate(this.user, { $push: { saves: this._id } });
        yield _1.Post.findByIdAndUpdate(this.post, { $push: { saves: this._id } });
    });
});
saveSchema.post("findOneAndDelete", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc) {
            yield _1.User.findByIdAndUpdate(doc.user, { $pull: { saves: doc._id } });
            yield _1.Post.findByIdAndUpdate(doc.post, { $pull: { saves: doc._id } });
        }
    });
});
exports.Save = (0, mongoose_1.model)("Save", saveSchema);
