import { Router } from "express";
import { createSave, deleteSave } from "../controllers";

const router = Router();

router.route("/").post(createSave);
router.route("/:id").delete(deleteSave);

export const saveRouter = router;
