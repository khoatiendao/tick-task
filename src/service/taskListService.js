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

    async getTaskListIdWithOtherController(taskList_array) {
        const taskList_Valid_Id = []
        for(let i = 0; i < taskList_array.length; i++) {
            const taskId = taskList_array[i]
            const result = await Model.taskListModel.findById(taskId).exec();
            if(!result) {
                throw new error ('Somthing wrong with task list id')
            }
            taskList_Valid_Id.push(result)
        }   
        return taskList_Valid_Id;
    },

    async getTaskWithBoardListId() {
        const result = await Model.taskListModel.find({}).populate('boardList').exec()
        return result
    },

    async getTaskWithBoardListIdParam(boardList_id) {
        const result = await Model.taskListModel.find({boardList: boardList_id}).exec()
        return result
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

    // async queryStatusTaskList(status) {
    //     const pending = status.pending;
    //     const inprocess = status.inprocess;
    //     const completed = status.completed;
    //     switch (status) {
    //         case pending:
    //             const result_Pending = await Model.taskListModel.find({status: 'Pending'})
    //             return result_Pending;
    //         case inprocess:
    //             const result_inprocess = await Model.taskListModel.find({status: 'In Process'})
    //             return result_inprocess;
    //         case completed:
    //             const result_completed = await Model.taskListModel.find({status: 'Completed'})
    //             return result_completed
    //         default:
    //             throw new Error ("No status to find task list")
    //     }
    // },

    async getTaskListFollowStatus(status_array) {
        const result = await Model.taskListModel.find({status: {$in: status_array}})
        return result;
    },

    async updateStatus(_id, taskList) {
        const newValues = {status: taskList.status}
        const result = await Model.taskListModel.findByIdAndUpdate(_id, newValues, {new: true}).select('-title -description -priority -startdate -duedate -boardList')
        return result;
    },

    async deleteOne(_id) {
        const result = await Model.taskListModel.findByIdAndDelete(_id).exec();
        return result
    }
}

module.exports = taskListService;