import { Router } from "express";
import { getUser, getUsers } from "../controllers";

const router = Router();

router.route("/").get(getUsers);
router.route("/:username").get(getUser);

export const userRouter = router;
