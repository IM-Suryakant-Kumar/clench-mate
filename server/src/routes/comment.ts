import { Router } from "express";
import { createComment, deleteComment, getComments, updateComment } from "../controllers";

const router = Router();

router.route("/").post(createComment).get(getComments);
router.route("/:id").patch(updateComment).delete(deleteComment);

export const commentRouter = router;
