const Model = require('../models/userModel')

const positionService = {
    async createPosition(position) {
        const result = await Model.positionModel.create(position);
        return result;
    },

    async getPosition(_id) {
        const result = await Model.positionModel.findById(_id).exec();
        return result;
    },

    async getPositionByMember(position_id) {
        const result = await Model.positionModel.findById(position_id).exec();
        return result
    },

    async findAllPosition() {
        const result = await Model.positionModel.find({});
        return result;
    },

    async updatePosition(_id, position) {
        const newValues = {
            name: position.name
        }
        const result = await Model.positionModel.findByIdAndUpdate(_id, newValues, {new: true})
        return result;
    },

    async deletePosition(_id) {
        const result = await Model.positionModel.findByIdAndDelete(_id).exec();
        return result;
    }
}

module.exports = positionService