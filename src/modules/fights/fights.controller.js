import fightsService from './fights.service.js';

class FightsController {
    async attack(req, res) {
        try {
            const attack = await fightsService.attack(req.body, req.params.defenderId);
            res.status(200).json(attack);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async defend(req, res) {
        try {
            const attack = await fightsService.defend(req.body?.correctAnswers, req.params.fightId);
            res.status(200).json(attack);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}

export default new FightsController();