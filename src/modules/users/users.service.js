import CRUDService from "../../core/services/crud.service.js";
import User from "../../models/user.schema.js";

class UsersService extends CRUDService{
    constructor() {
        super(User);
    }

    create(_body) {
        throw new Error('Method not implemented');
    }

    async getAll() {
        const users = await User.find();
        return this.mapUsers(users);;
    }

    async revive(userId) {
        const user = await this.getById(userId);
        const timeSinceLastRevival = 
            Math.abs(new Date().getMilliseconds() - new Date(user.lastRevival).getMilliseconds()) / (1000 * 60 * 60);
        if (timeSinceLastRevival >= 24 || !user.lastRevival) {
            return await this.update(userId, {
                ...user.toObject({ virtuals: true }),
                lastRevival: new Date(),
                hp: 5,
            });
        } else {
            throw Object.assign(new Error, { status: 400, message: 'Not enough time since last revival' });
        }
    }

    async rewardXp(userId, correctAnswers, isDraft = false) {
        const user = await this.getById(userId);
        let xp = user.xp + (correctAnswers * 50);
        if (!isDraft) {
            xp = xp + 100;
        }
        return await this.update(userId, {
            ...user.toObject({ virtuals: true }),
            xp,
        });
    }

    async updateLoser(loserId) {
        const user = await this.getById(loserId);
        const hp = user.hp !== 0 ? user.hp - 1 : 0;
        return await this.update(loserId, {
            ...user.toObject({ virtuals: true }),
            hp,
        });
    }

    async handleDraft(fight) {
        await this.rewardXp(fight.agressorId, fight.agressorCorrectAnswers, true);
        await this.rewardXp(fight.defenderId, fight.defenderCorrectAnswers, true);
    }

    mapUsers(users) {
        const mappedUsers = users.map((user) => {
            const mappedUser = user.toObject({ virtuals: true });
            delete mappedUser['password'];
            return mappedUser;
        });
        return mappedUsers;
    }
}

export default new UsersService();