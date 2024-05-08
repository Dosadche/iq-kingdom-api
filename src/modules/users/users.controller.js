import usersService from "./users.service.js";
import CRUDController from "../../core/controllers/crud.controller.js";

class UsersController extends CRUDController {
    constructor() {
        super(usersService);
    }

    create(_req, _res) {
        throw new Error('Method not implemented');
    }

    update(_req, _res) {
        throw new Error('Method not implemented');
    }
}

export default new UsersController();