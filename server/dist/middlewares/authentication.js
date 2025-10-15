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
exports.authenticateUser = void 0;
const async_1 = require("./async");
const errors_1 = require("../errors");
const jsonwebtoken_1 = require("jsonwebtoken");
exports.authenticateUser = (0, async_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (!token)
        throw new errors_1.UnauthenticatedError("Authentication Invalid");
    const { _id } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
    req.userId = _id;
    next();
}));
