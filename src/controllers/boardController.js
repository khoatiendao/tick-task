const boardService = require('../service/boardService');
const departmentService = require('../service/departmentService');
const {generateUUIDTimeWithCharacter} = require('../utils/generateUUID')

const postBoard = async (req, res) => {
    try {
        const _id = generateUUIDTimeWithCharacter('B');
        const title = req.body.title;
        const department_id = req.body.department_id;
        const department = await departmentService.getDepartmentByIdWithOrtherController(department_id);
        if(!title || !department_id) {
            return res.status(400).json({message: 'Please fill information'})
        } else if(!department_id) {
            return res.status(400).json({message: 'Department does not exists'})
        } else {
            const board = {_id: _id, title: title, department: department}
            const result = await boardService.createBoard(board);
            if(result) {
                res.status(201).json({message: 'Create Board Successfull', board: result})
            } else {
                res.status(400).json({message: 'Create Board Failed'})
            }
        }
    } catch (error) {
        res.status(500)
        console.log(error)
    }
}

const getBoardById = async(req, res) => {
    try {
        const _id = req.params._id;
        const result = await boardService.findBoardById(_id);
        if(result) {
            res.status(200).json({message: 'Get Item Successfull', board: result})
        } else {
            res.status(400).json({message: 'Get Item Failed'})
        }
    } catch (error) {
        res.status(500)
        console.log(error)
    }
}

const getAllBoard = async(req, res) => {
    try {
        const result = await boardService.findBoardAll();
        if(result) {
            res.status(200).json({message: 'Get All Item Successfull', board: result})
        } else {
            res.status(400).json({message: 'Get All Item Failed'})
        }
    } catch (error) {
        res.status(500)
        console.log(error)
    }
}

const deleteBoardById = async(req, res) => {
    try {
        const _id = req.params._id;
        const result = await boardService.deleteBoardById(_id);
        if(result) {
            res.status(200).json({message: 'Delete Item Successfull'})
        } else {
            res.status(400).json({message: 'Delete Item Failed'})
        }
    } catch (error) {
        res.status(500)
        console.log(error)
    }
}

const updateBoardById = async(req, res) => {
    try {
        const _id = req.params._id;
        const title = req.body.title
        const department_id = req.body.department_id
        const department = await departmentService.getDepartmentByIdWithOrtherController(department_id);
        if(!title || !department_id) {
            return res.status(400).json({message: 'Please fill all information'})
        } else if(!department) {
            return res.status(400).json({message: 'Department does not exists'})
        } else {
            const board = {_id: _id, title: title, department: department}
            const result = await boardService.updateBoardById(board);
            if(result) {
                res.status(200).json({message: 'Update Item Successfull', board: result})
            } else {
                res.status(400).json({message: 'Update Item Failed'})
            }
        }
    } catch (error) {
        res.status(500)
        console.log(error)
    }
}

const getAllBoardWithDepartment = async(req, res) => {
    try {
        const result = await boardService.findBoardWithDepartment();
        if(result) {
            return res.status(200).json({message: 'Get all board with department successfull', board: result})
        } else {
            return res.status(400).json({message: 'Get all board with department failed'})
        }
    } catch (error) {
        res.status(500)
        console.log(error);
    }
}

const getBoardByIdWithDepartment = async(req, res) => {
    try {
        const _id = req.params._id
        const result = await boardService.findBoardByIdWithDepartment(_id);
        if(result) {
            return res.status(200).json({message: 'Get one board with department successfull', board: result})
        } else {
            return res.status(400).json({message: 'Get one board with department failed'})
        }
    } catch (error) {
        res.status(500)
        console.log(error);
    }
}

module.exports = {postBoard, getBoardById, getAllBoard, deleteBoardById, updateBoardById, getAllBoardWithDepartment, getBoardByIdWithDepartment}