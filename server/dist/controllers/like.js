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
exports.deleteLike = exports.createLike = void 0;
const middlewares_1 = require("../middlewares");
const models_1 = require("../models");
exports.createLike = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const like = yield models_1.Like.create(Object.assign({ user: req.userId }, req.body));
    res.status(200).json({ like });
}));
exports.deleteLike = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Like.findOneAndDelete({ user: req.userId, post: req.params.id });
    res.status(200).json({ message: "Like deleted Successfully." });
}));
