import CRUDService from '../../core/services/crud.service.js';
import Notification from '../../models/notifications.schema.js';
import User from '../../models/user.schema.js';

class NotificationsService extends CRUDService {
    constructor() {
        super(Notification)
    }

    async getByUserId(userId) {
        const notification = await Notification.find({ userId });
        return notification.map((notification) => 
            notification.toObject({ virtuals: true })).reverse();
    }

    async read(notificationsIds) {
        for (const id of notificationsIds) {
            await this.update(id, { isRead: true });
        }
    }

    async sendWinnerNotification(winnerId, loserId) {
        const sender = await this.getSender(loserId);
        await Notification.create({
            title: 'Victory',
            content: `You won the battle with ${sender.name}`,
            type: 'victory',
            userId: winnerId,
            senderId: loserId,
            isRead: false,
        });
    }

    async sendLoserNotification(loserId, winnerId) {
        const sender = await this.getSender(winnerId);
        await Notification.create({
            title: 'Defeat',
            content: `You lost the battle with ${sender.name}`,
            type: 'defeat',
            userId: loserId,
            senderId: winnerId,
            isRead: false,
        });
    }

    async sendDraftNotification(user1, user2) {
        const sender = await this.getSender(user2);
        await Notification.create({
            title: 'Draft',
            content: `You and ${sender.name} both were good`,
            type: 'draft',
            userId: user1,
            senderId: user2,
            isRead: false,
        });
        const sender2 = await this.getSender(user1);
        await Notification.create({
            title: 'Draft',
            content: `You and ${sender2.name} both were good`,
            type: 'draft',
            userId: user2,
            senderId: user1,
            isRead: false,
        });
    }

    async getSender(userId) {
        const user = await User.findById(userId);
        return user.toObject({ virtuals: true });
    }

    delete(_id) {
        throw new Error('Method not implemented');
    }

    getById(_id) {
        throw new Error('Method not implemented');
    }
}

export default new NotificationsService();