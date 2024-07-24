import { Router } from "express";
import authController from "./auth.controller.js";

const router = new Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.delete('/logout', authController.logout);
router.post('/refresh-token', authController.refreshToken);

export default router;