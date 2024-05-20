import { Router } from "express";
import fightsController from "./fights.controller.js";

const router = new Router();

router.post('/attack/:defenderId', fightsController.attack);
router.put('/defend/:fightId', fightsController.defend);

export default router;