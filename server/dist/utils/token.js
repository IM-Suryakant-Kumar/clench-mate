"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = void 0;
const sendToken = (res, statusCode, user, message) => {
    const token = user.createJWTToken();
    res
        .status(statusCode)
        .cookie("token", token, {
        httpOnly: true,
        maxAge: 5 * 24 * 60 * 60 * 1000,
    })
        .json({ success: true, message });
};
exports.sendToken = sendToken;
