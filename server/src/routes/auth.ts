import { Router } from "express";
import { getProfile, login, logout, signup } from "../controllers";
import { authenticateUser } from "../middlewares";

const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/me").get(authenticateUser, getProfile);

export const authRouter = router;
