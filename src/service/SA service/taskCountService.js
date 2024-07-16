const Model = require('../../models/userModel')

const taskListCountService = {
    async sumTask() {
        const result = await Model.taskListModel.countDocuments({})
        return result;
    },

    async taskStatusPending() {
        const result = await Model.taskListModel.countDocuments({status: 'Pending'});
        return result;
    },

    async taskStatusInProcess() {
        const result = await Model.taskListModel.countDocuments({status: 'In Process'})
        return result
    },

    async taskStatusCompleted() {
        const result = await Model.taskListModel.countDocuments({status: 'Completed'})
        return result;
    }
}

module.exports = taskListCountService