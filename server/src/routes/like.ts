import { Router } from "express";
import { createLike, deleteLike } from "../controllers";

const router = Router();

router.route("/").post(createLike);
router.route("/:id").delete(deleteLike);

export const likeRouter = Router();
