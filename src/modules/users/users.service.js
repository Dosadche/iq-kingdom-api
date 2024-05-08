import CRUDService from "../../core/services/crud.service.js";
import User from "../../models/user.schema.js";

class UsersService extends CRUDService{
    constructor() {
        super(User);
    }

    create(_req, _res) {
        throw new Error('Method not implemented');
    }

    update(_req, _res) {
        throw new Error('Method not implemented');
    }
}

export default new UsersService();