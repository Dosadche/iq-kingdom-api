import questionsService from "./questions.service.js";
import CRUDController from "../../core/controllers/crud.controller.js";

class QuestionsController extends CRUDController {
    constructor() {
        super(questionsService);
    }

    async getRandom(req, res) {
        try {
            const questions = await questionsService.getRandom();
            res.status(200).json(questions);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}

export default new QuestionsController();