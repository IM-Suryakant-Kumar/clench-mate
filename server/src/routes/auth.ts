import { Router } from "express";
import { login, logout, signup } from "../controllers";

const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logour").get(logout);

export const authRouter = router;