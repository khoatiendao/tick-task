const taskAssignmentService = require('../service/taskAssignmentService')
const {generateUUIDWithCharacter} = require('../utils/generateUUID')
const taskListService = require('../service/taskListService')
const memberService = require('../service/memberService')
const errorResponse = require('../helpers/errorResponse')

const createTaskAssignment = async(req, res) => {
    const _id = generateUUIDWithCharacter('TA')
    const taskList_id = req.body.taskList_id
    const taskList_array = Array.isArray(taskList_id) ? taskList_id : [taskList_id]
    const member_id = req.body.member_id
    const member_array = Array.isArray(member_id) ? [member_id] : member_id
    const taskList = await taskListService.getTaskListIdWithOtherController(taskList_array);
    const member = await memberService.getMember_ArrayWithTaskAssignment(member_array);
    if(!taskList_id || !member_id) {
        throw new errorResponse(400, 'Please fill all information')
    } else if(!taskList) {
        throw new errorResponse(400, 'Task List does not exists')
    } else if(!member) {
        throw new errorResponse(400, 'Member does not exists')
    } else {
        const taskAssignment = {_id: _id, taskList: taskList, member: member}
        const result = await taskAssignmentService.createOne(taskAssignment);
        if(result) {
            return res.status(201).json({message: 'Create task assignment successfull', taskAssignment: result})
        } else {
            throw new errorResponse(400, 'Create task assignment failed')
        }
    }
}

const getTaskAssignmentById = async(req, res) => {
    const _id = req.params._id
    const result = await taskAssignmentService.getById(_id);
    if(result) {
        return res.status(200).json({message: 'Get one task assignment successfull', taskAssignment: result})
    }else {        
        throw new errorResponse(400, 'Get one task assignment failed')
    }
}

const getAllTaskAssignment = async(req, res) => {
    const result = await taskAssignmentService.getAll();
    if(result) {
        return res.status(200).json({message: 'Get all task assignment successfull', taskAssignment: result})
    } else {
        throw new errorResponse(400, 'Get all task assignment failed')
    }
}

const updateTaskAssignment = async(req, res) => {
    const _id = req.params._id
    const taskList_id = req.body.taskList_id
    const taskList_array = Array.isArray(taskList_id) ? taskList_id : [taskList_id]
    const member_id = req.body.member_id
    const taskList = await taskListService.getTaskListIdWithOtherController(taskList_array)
    const member = await memberService.getMemberIdWithOtherController(member_id)
    if(!taskList_id || !member_id) {
        throw new errorResponse(400, 'Please fill all information')
    } else if(!taskList) {
        throw new errorResponse(400, 'Task list does not exists')
    } else if(!member) {
        throw new errorResponse(400, 'Member does not exists')
    } else {
        const taskAssignment = {taskList: taskList, member: member}
        const result = await taskAssignmentService.update(_id, taskAssignment)
        if(result.error) {
            throw new errorResponse(400, 'Update task assignment failed')
        } else {
            return res.status(200).json({message: 'Update task assignment successfull', taskAssignment: result})
        }
    }
}

const deleteTaskAssignment = async(req, res) => {
    const _id = req.params._id
    const result = await taskAssignmentService.delete(_id)
    if(result) {
        return res.status(200).json({message: 'Delete task assignment successfull'})
    } else {
        throw new errorResponse(400, 'Delete task assignment failed')
    }
}

const deleteOneTaskListWithTaskAssignment = async(req, res) => {
    const _id = req.params._id
    const taskList_id = req.params.taskList_id
    const result = await taskAssignmentService.removeTaskList(_id, taskList_id)
    if(result.errorTaskAssignment && result.errorTaskList) {
        throw new errorResponse(400, 'Please provide task list ID')
    } else {
        return res.status(200).json({message: 'Delete task list successfull', taskAssignment: result})
    }
}

const deleteOneMemberWithTaskAssignment = async(req, res) => {
    const _id = req.params._id
    const member_id = req.params.member_id
    const result = await taskAssignmentService.removeMember(_id, member_id)
    if(result.errorTaskAssignment && result.errorMember) {        
        throw new errorResponse(400, 'Please provide member id')
    } else {
        return res.status(200).json({message: 'Delete member successfull', taskAssignment: result})
    }
}

const findAllTaskListWithMemberId = async(req, res) => {
    const member_id = req.params.member_id
    const result = await taskAssignmentService.getAllTaskListWithMemberId(member_id)
    if(result) {
        return res.status(200).json({message: 'Get item successfull', taskAssignment: result})
    } else {
        throw new errorResponse(400, 'Get item failed')
    }
}

const addMemberforTaskListWithTaskAssignment = async(req, res) => {
    const _id = req.params._id
    const member_id = req.body.member_id
    const member_array = Array.isArray(member_id) ? [member_id] : member_id
    const member = await memberService.getMember_ArrayWithTaskAssignment(member_array)
    if(!member_id) {
        throw new errorResponse(400, 'Please fill member')
    } else if (!member) {
        throw new errorResponse(400, 'Member does not exists')
    } else {
        const result = await taskAssignmentService.pushMember(_id, ...member)
        if(result) {
            return res.status(200).json({message: 'Add member successfull', taskAssignment: result})
        } else {
            throw new errorResponse(400, 'Add member failed')
        }
    }
}

module.exports = {
    createTaskAssignment, 
    getTaskAssignmentById, 
    getAllTaskAssignment, 
    updateTaskAssignment, 
    deleteTaskAssignment, 
    findAllTaskListWithMemberId,
    deleteOneTaskListWithTaskAssignment,
    addMemberforTaskListWithTaskAssignment,
    deleteOneMemberWithTaskAssignment}