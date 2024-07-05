const taskAssignmentService = require('../service/taskAssignmentService')
const {generateUUIDWithCharacter} = require('../utils/generateUUID')
const taskListService = require('../service/taskListService')
const memberService = require('../service/memberService')

const createTaskAssignment = async(req, res) => {
    try {
        const _id = generateUUIDWithCharacter('TA')
        const taskList_id = req.body.taskList_id
        const member_id = req.body.member_id
        const taskList = await taskListService.getTaskListIdWithOtherController(taskList_id);
        const member = await memberService.getMemberIdWithOtherController(member_id);
        if(!taskList_id || !member_id) {
            return res.status(400).json({message: 'Please fill all information'})
        } else if(!taskList) {
            return res.status(400).json({message: 'Task List does not exists'})
        } else if(!member) {
            return res.status(400).json({message: 'Member does not exists'})
        } else {
            const taskAssignment = {_id: _id, taskList_id: taskList, member_id: member}
            const result = await taskAssignmentService.createOne(taskAssignment);
            if(result) {
                return res.status(201).json({message: 'Create task assignment successfull', taskAssignment: result})
            } else {
                return res.status(400).json({message: 'Create task assignment failed'})
            }
        }
    } catch (error) {
        res.status(500)
        console.log(error);
    }
}

const getTaskAssignmentById = async(req, res) => {
    try {
        const _id = req.params._id
        const result = await taskAssignmentService.getById(_id);
        if(result) {
            return res.status(200).json({message: 'Get one task assignment successfull', taskAssignment: result})
        }else {
            return res.status(400).json({message: 'Get one task assignment failed'})
        }
    } catch (error) {
        res.status(500)
        console.log(error);
    }
}

const getAllTaskAssignment = async(req, res) => {
    try {
        const result = await taskAssignmentService.getAll();
        if(result) {
            return res.status(200).json({message: 'Get all task assignment successfull', taskAssignment: result})
        } else {
            return res.status(400).json({message: 'Get all task assignment failed'})
        }
    } catch (error) {
        res.status(500)
        console.log(error);
    }
}

module.exports = {createTaskAssignment, getTaskAssignmentById, getAllTaskAssignment}