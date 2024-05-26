import { Router } from "express";
import notificationsController from './notifications.controller.js';

const router = new Router();

router.get('/', notificationsController.getAll);
router.put('/read', notificationsController.read);
router.post('/', notificationsController.create);

export default router;