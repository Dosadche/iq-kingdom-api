class CRUDService {
    constructor(schema) {
        this.schema = schema;
    }

    async getAll() {
        try {
            const items = await this.schema.find();
            return items.map((item) => 
                item.toObject({ virtuals: true })).reverse();
        } catch (error) {
            throw Object.assign(new Error, { status: 404, message: error.message });
        }
    }

    async getById(id) {
        try {
            return await this.schema.findById(id);
        } catch (error) {
            throw Object.assign(new Error, { status: 404, message: error.message });
        }
    }

    async create(body) {
        try {
            return await this.schema.create(body);
        } catch (error) {
            throw Object.assign(new Error, { status: 400, message: error.message });
        }
    }

    async update(id, body) {
        try {
            return await this.schema.findByIdAndUpdate(id, body, { new: true });
        } catch (error) {
            throw Object.assign(new Error, { status: 400, message: error.message });
        }
    }

    async delete(id) {
        try {
            return await this.schema.findByIdAndDelete(id);
        } catch (error) {
            throw Object.assign(new Error, { status: 400, message: error.message });
        }
    }
}

export default CRUDService;