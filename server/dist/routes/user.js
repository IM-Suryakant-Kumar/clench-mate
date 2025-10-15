"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.route("/").get(controllers_1.getUsers);
router.route("/:id").get(controllers_1.getUser);
exports.userRouter = router;
