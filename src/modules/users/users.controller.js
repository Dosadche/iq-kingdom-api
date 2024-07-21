import usersService from "./users.service.js";
import CRUDController from "../../core/controllers/crud.controller.js";

class UsersController extends CRUDController {
    constructor() {
        super(usersService);
    }

    async revive(req, res) {
        try {
            const user = await usersService.revive(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(error.status).json(error);
        }   
    }

    create(_req, _res) {
        throw new Error('Method not implemented');
    }

    update(_req, _res) {
        throw new Error('Method not implemented');
    }
}

export default new UsersController();