import { Router } from "express";
import { getUser, getUsers } from "../controllers";

const router = Router();

router.route("/").get(getUsers);
router.route("/:id").get(getUser);

export const userRouter = router;
