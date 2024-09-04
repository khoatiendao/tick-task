const taskListService = require('../service/taskListService')
const boardListService = require('../service/boardListService')
const {generateUUIDWithCharacter} = require('../utils/generateUUID')
const errorResponse = require('../helpers/errorResponse')

const createOneTaskList = async(req, res) => {
    const _id = generateUUIDWithCharacter('TL')
    const title = req.body.title
    const description = req.body.description
    const status = req.body.status
    const priority = req.body.priority
    const startdate = req.body.startdate
    const duedate = req.body.duedate
    const boardList_id = req.body.boardList_id
    const boardList = await boardListService.getByIdWithOtherController(boardList_id)
    if(!title || !description || !status || !priority || !boardList_id) {
        throw new errorResponse(400, 'Please fill all information')
    } else if(!boardList) {
        throw new errorResponse(400, 'Board List does exists')
    } else {
        const taskList = {
            _id: _id, 
            title: title, 
            description: description, 
            status: status, 
            priority: priority, 
            startdate: startdate, 
            duedate: duedate,
            boardList: boardList
        }
        const result = await taskListService.createOne(taskList);
        if(result) {
            return res.status(201).json({message: 'Create one task lisk successfull', taskList: result})
        }else {
            throw new errorResponse(400, 'Create task list failed')
        }
    }
}

const getOneTaskList = async(req, res) => {
    const _id = req.params._id
    const result = await taskListService.getById(_id);
    if(result) {
        return res.status(200).json({message: 'Get one task list successfull', taskList: result})
    } else {
        throw new errorResponse(400, 'Get one task list failed')
    }
}

const getAllTaskList = async(req, res) => {
    const result = await taskListService.getAll();
    if(result) {
        return res.status(200).json({message: 'Get all task list successfull', taskList: result})
    } else {        
        throw new errorResponse(400, 'Get all task list failed')
    }
}

const updateOneTaskList = async(req, res) => {
    const _id = req.params._id
    const title = req.body.title
    const description = req.body.description
    const status = req.body.status
    const priority = req.body.priority
    const startdate = req.body.startdate
    const duedate = req.body.duedate
    const boardList_id = req.body.boardList_id
    const boardList = await boardListService.getByIdWithOtherController(boardList_id)
    if(!title || !description || !status || !priority || !startdate || !duedate || !boardList_id) {
        throw new errorResponse(400, 'Please fill all information')
    } else if(!boardList) {
        throw new errorResponse(400, 'Board List does not exists')
    } else {
        const taskList = {
            title: title,
            description: description,
            status: status,
            priority: priority,
            startdate: startdate,
            duedate: duedate,
            boardList: boardList
        }
        const result = await taskListService.update(_id, taskList)
        if(result) {
            return res.status(200).json({message: 'Update task list successfull', taskList: result})
        } else {
            throw new errorResponse(400, 'Update task list failed')
        }
    }    
}

const updateStatusTaskList = async(req, res) => {
    const _id = req.params._id
    const status = req.body.status
    if(!status) {
        throw new errorResponse(400, 'Please choose status for task')
    } else {
        const taskList = {status: status}
        const result = await taskListService.updateStatus(_id, taskList)
        if(result) {
            return res.status(200).json({message: 'Update status successfull', taskList: result})
        } else {
            throw new errorResponse(400, 'Update status failed')
        }
    }
}

const updateDateTaskList = async(req, res) => {
    const _id = req.params._id
    const startdate = req.body.startdate
    const duedate = req.body.duedate
    const taskList = {startdate: startdate, duedate: duedate}
    const result = await taskListService.updateStartDateAndDueDate(_id, taskList)
    if(result) {
        return res.status(200).json({message: 'Update date task list successfull', taskList: result})
    } else {
        throw new errorResponse(400, 'Update date task list failed')
    }
}

const deleteTaskList = async(req, res) => {
    const _id = req.params._id
    const result = await taskListService.deleteOne(_id)
    if(result) {
        return res.status(200).json({message: 'Delete task list successfull'})
    } else {
        throw new errorResponse(400, 'Delete task list failed')
    }
}

const getAllTaskListWithBoardList = async(req, res) => {
    const result = await taskListService.getTaskWithBoardListId()
    if(result) {
        return res.status(200).json({message: 'Get item successfull', taskList: result})
    } else {        
        throw new errorResponse(400, 'Get item failed')
    }
}

const getAllTaskListWithBoardListParam = async(req, res) => {
    const boardList_id = req.params.boardList_id
    const result = await taskListService.getTaskWithBoardListIdParam(boardList_id)
    if(result) {
        return res.status(200).json({message: 'Get item successfull', boardList: result})
    } else {
        throw new errorResponse(400, 'Get item failed')
    }
}

const getTaskListWithStatus = async(req, res) => {
    const {status} = req.query
    const statusSplit = status.split(',')
    const status_array = Array.isArray(status) ? [statusSplit] : statusSplit
    const result = await taskListService.getTaskListFollowStatus(status_array)
    if(result) {
        return res.status(200).json({message: 'Get task list with status successfull', taskList: result})
    } else {
        throw new errorResponse(400, 'Get task list with status failed')
    }    
}

const getTaskListWithDueDate = async(req, res) => {
    const {duedate} = req.query
    const duedate_split = duedate.split(',')
    const duedate_array = Array.isArray(duedate) ? [duedate_split] : duedate_split
    const result = await taskListService.getTaskListFollowDueDate(duedate_array)
    if(result) {
        return res.status(200).json({message: 'Get task list with duedate successfull', taskList: result})
    } else {
        throw new errorResponse(400, 'Get task list with duedate failed')
    }
}

module.exports = {
    createOneTaskList, 
    getOneTaskList, 
    getAllTaskList, 
    updateOneTaskList, 
    deleteTaskList, 
    getAllTaskListWithBoardList, 
    getAllTaskListWithBoardListParam,
    updateStatusTaskList,
    getTaskListWithStatus,
    getTaskListWithDueDate,
    updateDateTaskList
}