const Model = require('../models/userModel')

const taskAssignmentService = {
    async createOne(taskAssignment) {
        const result = await Model.taskAssignmentModel.create(taskAssignment);
        return result
    },

    async pushTaskList(member, ...taskList) {
        const taskAssignmentWithMember = await Model.taskAssignmentModel.findOne({member}).exec()
        if(!taskAssignmentWithMember) {
            return { error: `TaskAssignment for member ${member.user.email} does not exist` };
        }
        taskAssignmentWithMember.taskList.push(...taskList)
        const result = await taskAssignmentWithMember.save()
        return result;
    },

    async removeTaskList(_id, taskList_id) {
        const taskAssignment_id = await Model.taskAssignmentModel.findById(_id).exec()
        if(!taskAssignment_id) {
            return { errortaskAssignment: `TaskAssignment for ${_id} does not exist` };
        }

        const taskAssignmentWithTaskList = taskAssignment_id.taskList.indexOf(taskList_id)
        if(taskAssignmentWithTaskList !== -1) {
            taskAssignment_id.taskList.splice(taskAssignmentWithTaskList, 1)
            const result = await taskAssignment_id.save()
            return result;
        } else {
            return { errorTaskList: `TaskAssignment for task list ${taskList_id} does not exist`}
        }

    },

    async getMember(member) {
        const result = await Model.taskAssignmentModel.findOne({member}).exec()
        return result;
    },

    async getById(_id) {
        const result = await Model.taskAssignmentModel.findById(_id).exec();
        return result
    },

    async getAll() {
        const result = await Model.taskAssignmentModel.find({});
        return result
    },

    async getAllTaskListWithMemberId(member_id) {
        const result = await Model.taskAssignmentModel.find({member: member_id}).populate('taskList').populate('member').exec()
        return result
    },

    async update(_id, taskAssignment) {
        const existingTaskAssignment = await Model.taskAssignmentModel.findById(_id).exec()
        if(!existingTaskAssignment) {
            return {error: 'Task Assignment does not exist'}
        }

        if(taskAssignment.member) {
            existingTaskAssignment.member = taskAssignment.member
        }

        if(Array.isArray(taskAssignment.taskList) && taskAssignment.taskList.length > 0) {
            taskAssignment.taskList.forEach(task => {
                if(!existingTaskAssignment.taskList.includes(task)) {
                    existingTaskAssignment.taskList.push(task)
                }
            });
        }

        const result = await existingTaskAssignment.save()
        return result;

    },

    async delete(_id) {
        const result = await Model.taskAssignmentModel.findByIdAndDelete(_id).exec();
        return result;
    }
}

module.exports = taskAssignmentService;