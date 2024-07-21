import Question from '../../models/questions.schema.js';
import CRUDService from '../../core/services/crud.service.js';
import { randomInt } from 'crypto';

class QuestionsService extends CRUDService {
    constructor() {
        super(Question);
    }

    async getRandom() {
        const questions = await this.getAll();
        const randomizedQuestions = [];
        do {
            const questionIndex = randomInt(0, questions.length);
            randomizedQuestions.push(questions[questionIndex]);
            questions.splice(questionIndex, 1);
        } while (randomizedQuestions.length < 5);
        return randomizedQuestions;
    }
}

export default new QuestionsService();