import { Router } from "express";
import { create, getAll, getById, update, remove } from "../controllers/task";
import { taskCreationValidations } from "../validations/task";
import { validate } from "../middlewares/validation";
const router = Router();

router.post("/", taskCreationValidations, validate, create);
router.get("/", getAll);
router.get("/:id", taskCreationValidations, validate, getById);
router.put("/", taskCreationValidations, validate, update);
router.delete("/", taskCreationValidations, validate, remove);

export default router;
