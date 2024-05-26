import CRUDService from '../../core/services/crud.service.js';
import Notification from '../../models/notifications.schema.js';

class NotificationsService extends CRUDService {
    constructor() {
        super(Notification)
    }

    async read(notificationsIds) {
        await notificationsIds.forEach(async id => {
            await this.update(id, { isRead: true });
        });
    }

    async sendWinnerNotification(winnerId, loserId) {
        await Notification.create({
            title: 'Victory',
            content: 'You won the battle',
            type: 'victory',
            userId: winnerId,
            senderId: loserId,
        });
    }

    async sendLoserNotification(loserId, winnerId) {
        await Notification.create({
            title: 'Defeat',
            content: 'You lost the battle',
            type: 'defeat',
            userId: loserId,
            senderId: winnerId,
        });
    }

    async sendDraftNotification(user1, user2) {
        await Notification.create({
            title: 'Draft',
            content: 'You both were good',
            type: 'draft',
            userId: user1,
            senderId: user2,
        });
        await Notification.create({
            title: 'Draft',
            content: 'You both were good',
            type: 'draft',
            userId: user2,
            senderId: user1,
        });
    }

    delete(_id) {
        throw new Error('Method not implemented');
    }

    getById(_id) {
        throw new Error('Method not implemented');
    }
}

export default new NotificationsService();