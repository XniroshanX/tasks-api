import { Router } from "express";
import { getAll } from "../controllers/user";
import { validate } from "../middlewares/validation";

const router = Router();
router.get("/", [], validate, getAll);

export default router;
