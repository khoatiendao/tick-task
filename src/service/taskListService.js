const Model = require('../models/userModel')

const taskListService = {
    async createOne(taskList) {
        const result = await Model.taskListModel.create(taskList);
        return result;
    },

    async getById(_id) {
        const result = await Model.taskListModel.findById(_id).exec();
        return result
    },

    async getAll() {
        const result = await Model.taskListModel.find({});
        return result;
    },

    async getTaskListIdWithOtherController(taskList_id) {
        const result = await Model.taskListModel.findById(taskList_id).exec();
        return result;
    },

    async update(_id, taskList) {
        const newValues = {
            title: taskList.title,
            description: taskList.description,
            status: taskList.status,
            priority: taskList.priority,
            startdate: taskList.startdate,
            duedate: taskList.duedate,
            boardList: taskList.boardList
        }
        const result = await Model.taskListModel.findByIdAndUpdate(_id, newValues, {new: true});
        return result
    },

    async deleteOne(_id) {
        const result = await Model.taskListModel.findByIdAndDelete(_id).exec();
        return result
    }
}

module.exports = taskListService;