import CRUDController from '../../core/controllers/crud.controller.js';
import notificationService from './notifications.service.js';

class NotificationController extends CRUDController {
    constructor() {
        super(notificationService);
    }

    async create(req, res) {
        try {
            const notification = await this.notificationService.create(req.body);
            res.status(201).json(notification);
        } catch (error) {
            res.status(error.status).json(error);
        }
    }

    async getByUserId(req, res) {
        try {
            const notifications = await notificationService.getByUserId(req.params.userId);
            return res.status(200).json(notifications);
        } catch (error) {
            res.status(error.status).json(error);
        }
    }

    async read(req, res) {
        try {
            await notificationService.read(req.body.notificationsIds);
            return res.json('Notifications updated successfully');
        } catch (error) {
            res.json(error);
        }
    }
}

export default new NotificationController();