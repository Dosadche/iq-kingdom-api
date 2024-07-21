class CRUDController {
    constructor(crudService) {
        if (crudService) {
            this.crudService = crudService;
        } else {
            throw new Error('No service provided');
        }
    }

    getAll = async (req, res) => {
        try {
            const list = await this.crudService.getAll();
            res.status(200).json(list);
        } catch (error) {
            res.status(error.status).json(error);
        }
    }

    getById = async (req, res) => {
        try {
            const entity = await this.crudService.getById(req.params?.id);
            res.status(200).json(entity);
        } catch (error) {
            res.status(error.status).json(error);
        }
    }

    create = async (req, res) => {
        try {
            const createdEntity = await this.crudService.create(req.body);
            res.status(201).json(createdEntity);
        } catch (error) {
            res.json(error);
        }
    }

    update = async (req, res) => {
        try {
            const updatedEntity = await this.crudService.update(req.params?.id, req.body);
            res.status(201).json(updatedEntity);
        } catch (error) {
            res.json(error);
        }
    }

    delete = async (req, res) => {
        try {
            const deletedEntity = await this.crudService.delete(req.params?.id);
            res.status(201).json(deletedEntity);
        } catch (error) {
            res.json(error);
        }
    }
}

export default CRUDController;