import CRUDService from "../../core/services/crud.service.js";
import User from "../../models/user.schema.js"
import Fight from "../../models/fights.schema.js";
import usersService from "../users/users.service.js";
import notificationsService from "../notifications/notifications.service.js";

class FightsService {
    constructor() {
        this.crudService = new CRUDService(Fight);
    }

    async getAll(queryParams, params) {
        let searchParams = {}
        if (queryParams.status === 'finished') {
            searchParams = { isFinished: true };
        } else if (queryParams.status === 'unfinished') {
            searchParams = { isFinished: false };
        }
        if (params.userId) {
            searchParams = {
                ...searchParams,
                $or: [
                    { defenderId: params.userId },
                    { agressorId: params.userId }
                ]
            };
        }
        const fights = await Fight.find(searchParams);
        return fights.map((f) => f.toObject({ virtuals: true })).reverse();
    }

    async attack(attack, defenderId) {
        const agressor = await User.findById(attack.agressorId);
        if (agressor.hp === 0) {
            throw Object.assign(new Error, { status: 400, message: 'Out of lives' });
        }
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
            await notificationsService.sendWinnerNotification(winnerId, loserId);
            await notificationsService.sendLoserNotification(loserId, winnerId);
        } else {
            await usersService.handleDraft(fight);
            await notificationsService.sendDraftNotification(fight.agressorId, fight.defenderId);
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