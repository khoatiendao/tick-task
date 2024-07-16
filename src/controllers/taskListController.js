const taskListService = require('../service/taskListService')
const boardListService = require('../service/boardListService')
const {generateUUIDWithCharacter} = require('../utils/generateUUID')

const createOneTaskList = async(req, res) => {
    try {
        const _id = generateUUIDWithCharacter('TL')
        const title = req.body.title
        const description = req.body.description
        const status = req.body.status
        const priority = req.body.priority
        const startdate = req.body.startdate
        const duedate = req.body.duedate
        const boardList_id = req.body.boardList_id
        const boardList = await boardListService.getByIdWithOtherController(boardList_id)
        if(!title || !description || !status || !priority || !startdate || !duedate || !boardList_id) {
            return res.status(400).json({message: 'Please fill all information'})
        } else if(!boardList) {
            return res.status(400).json({message: 'Board List does exists'})
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
                return res.status(400).json({message: 'Create task list failed'})
            }
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
        console.log(error);
    }
}

const getOneTaskList = async(req, res) => {
    try {
        const _id = req.params._id
        const result = await taskListService.getById(_id);
        if(result) {
            return res.status(200).json({message: 'Get one task list successfull', taskList: result})
        } else {
            return res.status(400).json({message: 'Get one task list successfull'})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
        console.log(error);
    }
}

const getAllTaskList = async(req, res) => {
    try {
        const result = await taskListService.getAll();
        if(result) {
            return res.status(200).json({message: 'Get all task list successfull', taskList: result})
        } else {
            return res.status(400).json({message: 'Get all task list failed'})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
        console.log(error);
    }
}

const updateOneTaskList = async(req, res) => {
    try {
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
            return res.status(400).json({message: 'Please fill all information'})
        } else if(!boardList) {
            return res.status(400).json({message: 'Board List does not exists'})
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
                return res.status(400).json({message: 'Update task list successfull'})
            }
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
        console.log(error);
    }
}

const updateStatusTaskList = async(req, res) => {
    try {
        const _id = req.params._id
        const status = req.body.status
        if(!status) {
            return res.status(400).json({message: 'Please choose status for task'})
        } else {
            const taskList = {status: status}
            const result = await taskListService.updateStatus(_id, taskList)
            if(result) {
                return res.status(200).json({message: 'Update status successfull', taskList: result})
            } else {
                return res.status(400).json({message: 'Update status failed'})
            }
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
        console.log(error);
    }
}

const deleteTaskList = async(req, res) => {
    try {
        const _id = req.params._id
        const result = await taskListService.deleteOne(_id)
        if(result) {
            return res.status(200).json({message: 'Delete task list successfull'})
        } else {
            return res.status(400).json({message: 'Delete task list failed'})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
        console.log(error);
    }
}

const getAllTaskListWithBoardList = async(req, res) => {
    try {
        const result = await taskListService.getTaskWithBoardListId()
        if(result) {
            return res.status(200).json({message: 'Get item successfull', taskList: result})
        } else {
            return res.status(200).json({message: 'Get item failed'})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
        console.log(error);
    }
}

const getAllTaskListWithBoardListParam = async(req, res) => {
    try {
        const boardList_id = req.params.boardList_id
        const result = await taskListService.getTaskWithBoardListIdParam(boardList_id)
        if(result) {
            return res.status(200).json({message: 'Get item successfull', boardList: result})
        } else {
            return res.status(200).json({message: 'Get item failed'})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
        console.log(error);
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
    updateStatusTaskList
}