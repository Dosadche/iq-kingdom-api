import CRUDController from '../../core/controllers/crud.controller.js';
import notificationService from './notifications.service.js';

class NotificationController extends CRUDController {
    constructor() {
        super(notificationService);
    }

    async read(req, res) {
        try {
            await this.notificationService.read(req.body.notificationsIds);
            return res.json('Notifications updated successfully');
        } catch (error) {
            res.json(error);
        }
    }
}

export default new NotificationController();