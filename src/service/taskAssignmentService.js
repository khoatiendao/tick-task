const Model = require('../models/userModel')

const taskAssignmentService = {
    async createOne(taskAssignment) {
        const result = await Model.taskAssignmentModel.create(taskAssignment);
        return result
    },

    async getById(_id) {
        const result = await Model.taskAssignmentModel.findById(_id).exec();
        return result
    },

    async getAll() {
        const result = await Model.taskAssignmentModel.find({});
        return result
    },

    async update(_id, taskAssignment) {
        const newValues = {
            taskList_id: taskAssignment.taskList,
            member_id: taskAssignment.member
        }
        const result = await Model.taskAssignmentModel.findByIdAndUpdate(_id, newValues, {new: true})
        return result;
    },

    async delete(_id) {
        const result = await Model.taskAssignmentModel.findByIdAndDelete(_id).exec();
        return result;
    }
}

module.exports = taskAssignmentService;