import { Router } from "express";
import {
	followUser,
	getProfile,
	login,
	logout,
	signup,
	unfollowUser,
	updateProfile,
} from "../controllers";
import { authenticateUser } from "../middlewares";
import { upload } from "../utils";

const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router
	.route("/me")
	.get(authenticateUser, getProfile)
	.patch(authenticateUser, upload.single("avatar"), updateProfile);
router.route("/follow").post(authenticateUser, followUser);
router.route("/unfollow").post(authenticateUser, unfollowUser);

export const authRouter = router;
