import { Router } from "express";
import usersController from "./users.controller.js";

const router = new Router();

router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.put('/revive/:id', usersController.revive);
router.delete('/:id', usersController.delete);

export default router;