import { Router } from "express";
import { create, getAll, getById, update, remove } from "../controllers/task";
import {
  taskCreationValidations,
  taskIdValidations,
  taskUpdateValidations,
  taskDeleteValidations,
} from "../validations/task";
import { validate } from "../middlewares/validation";
const router = Router();

router.post("/", taskCreationValidations, validate, create);
router.get("/", getAll);
router.get("/:id", taskIdValidations, validate, getById);
router.put("/:id", taskUpdateValidations, validate, update);
router.delete("/:id", taskDeleteValidations, validate, remove);

export default router;
