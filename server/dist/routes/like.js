"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.route("/").post(controllers_1.createLike);
router.route("/:id").delete(controllers_1.deleteLike);
exports.likeRouter = router;
