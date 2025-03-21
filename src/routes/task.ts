import { Router } from "express";
import { create } from "../controllers/task";
import { taskCreationValidations } from "../validations/task";
import { validate } from "../middlewares/validation";
const router = Router();

router.post("/", taskCreationValidations, validate, create);

export default router;
