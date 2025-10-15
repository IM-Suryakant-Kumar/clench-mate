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
exports.deleteSave = exports.createSave = void 0;
const middlewares_1 = require("../middlewares");
const models_1 = require("../models");
exports.createSave = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const save = yield models_1.Save.create(Object.assign({ user: req.userId }, req.body));
    res.status(200).json({ save });
}));
exports.deleteSave = (0, middlewares_1.asyncWrapper)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Save.findOneAndDelete({ user: req.userId, post: req.params.id });
    res.status(200).json({ message: "Save deleted Successfully." });
}));
