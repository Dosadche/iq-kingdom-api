import { Router } from "express";
import questionsController from "./questions.controller.js";

const router = new Router();

router.get('/', questionsController.getAll);
router.get('/random', questionsController.getRandom);
router.get('/:id', questionsController.getById);
router.post('/', questionsController.create);
router.put('/:id', questionsController.update);
router.delete('/:id', questionsController.delete);

export default router;