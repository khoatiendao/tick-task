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

    async getTaskListFollowStatus(status_array) {
        const result = await Model.taskListModel.find({status: {$in: status_array}})
        return result;
    },

    async getTaskListFollowDueDate(duedate_array) {
        const now = new Date();
        let duedateConditions = []
        duedate_array.forEach(duedate => {
            switch (duedate) {
                case 'overduedate' :
                    duedateConditions.push({ duedate: {$lte: now}})
                    break;
                case 'tomorow' :
                    const endOfTomorow = new Date(now)
                    endOfTomorow.setDate(now.getDate() + 1)
                    endOfTomorow.setHours(24, 59, 59, 999)
                    duedateConditions.push({ duedate: {$gte: now, $lte: endOfTomorow}})
                    break;
                case 'nextweek':
                    const startOfNextWeek = new Date(now)
                    startOfNextWeek.setDate(now.getDate() + (7 - now.getDay()))
                    startOfNextWeek.setHours(0, 0, 0, 0)
                    const endOfNextWeek = new Date(startOfNextWeek)
                    endOfNextWeek.setDate(startOfNextWeek.getDate() + 6)
                    endOfNextWeek.setHours(24,  59,  59,  999)
                    duedateConditions.push({duedate: {$gte: startOfNextWeek, $lte: endOfNextWeek}})
                    break;
                case 'nextmonth':
                    const endOfMonth = new Date(now)
                    endOfMonth.setMonth(now.getMonth() + 1)
                    endOfMonth.setHours(0, 0, 0, 0)
                    const endOfNextMonth = new Date(endOfMonth)
                    endOfNextMonth.setMonth(endOfMonth.getMonth() - 1)
                    endOfNextMonth.setHours(24,  59,  59,  999)
                    duedateConditions.push({ duedate: {$gte: endOfNextMonth, $lte: endOfMonth}})
                    break;
                case 'no duedate':
                    duedateConditions.push({ duedate: {$eq: null}})
                    break;
                default:
                    break;
            }
        })

        const query = {}
        if(Object.keys(duedateConditions).length > 0) {
            query.$or = duedateConditions
        }

        try {
            const result = await Model.taskListModel.find(query)
            return result
        } catch (error) {
            console.log("Error about fetching task list due date: ", error);
        }
        
    },

    async updateStatus(_id, taskList) {
        const newValues = {status: taskList.status}
        const result = await Model.taskListModel.findByIdAndUpdate(_id, newValues, {new: true}).select('-title -description -priority -startdate -duedate -boardList -createdAt -updatedAt')
        return result;
    },

    async updateStartDateAndDueDate(_id, taskList) {
        const newValues = {startdate: taskList.startdate, duedate: taskList.duedate}
        const result = await Model.taskListModel.findByIdAndUpdate(_id, newValues, {new: true}).select('-title -description -status -priority -boardList -createdAt -updatedAt')
        return result;
    },

    async deleteOne(_id) {
        const result = await Model.taskListModel.findByIdAndDelete(_id).exec();
        return result
    }
}

module.exports = taskListService;