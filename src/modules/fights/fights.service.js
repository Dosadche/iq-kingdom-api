import CRUDService from "../../core/services/crud.service.js";
import Fight from "../../models/fights.schema.js";
import usersService from "../users/users.service.js";

class FightsService {
    constructor() {
        this.crudService = new CRUDService(Fight);
    }

    async attack(attack, defenderId) {
        return await this.crudService.create({ ...attack, defenderId });
    }

    async defend(defenderCorrectAnswers, fightId) {
        const fight = await this.crudService.getById(fightId);
        if (fight.isFinished) {
            return 'Fight is already finished';
        }
        const winnerId = this.getWinnerId(fight, defenderCorrectAnswers);
        const updatedFight = await this.crudService.update(fightId, { 
            defenderCorrectAnswers,
            winnerId,
            isFinished: true,
        });
        await this.updateUsersAfterFight(winnerId, updatedFight);
        return updatedFight;
    }

    async updateUsersAfterFight(winnerId, fight) {
        if (winnerId !== 'Draft') {
            const correctAnswers = winnerId === fight.agressorId ? fight.agressorCorrectAnswers : fight.defenderCorrectAnswers;
            await usersService.rewardXp(winnerId, correctAnswers);
            const loserId = winnerId === fight.agressorId ? fight.defenderId : fight.agressorId;
            await usersService.updateLoser(loserId);
        } else {
            await usersService.handleDraft(fight)
        }
    }

    getWinnerId(fight, defenderCorrectAnswers) {
        if (defenderCorrectAnswers === fight.agressorCorrectAnswers) {
            return 'Draft';
        } else if (defenderCorrectAnswers >= fight.agressorCorrectAnswers) {
            return fight.defenderId;
        } else {
            return fight.agressorId;
        }
    }
}

export default new FightsService();