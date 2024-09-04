const errorResponse = require('../helpers/errorResponse');
const boardService = require('../service/boardService');
const departmentService = require('../service/departmentService');
const {generateUUIDTimeWithCharacter} = require('../utils/generateUUID')

const postBoard = async (req, res) => {
    const _id = generateUUIDTimeWithCharacter('B');
    const title = req.body.title;
    const department_id = req.body.department_id;
    const department = await departmentService.getDepartmentByIdWithOrtherController(department_id);
    if(!title || !department_id) {
        throw new errorResponse(400, 'Please fill information')
    } else if(!department_id) {
        throw new errorResponse(400, 'Department does not exists')
    } else {
        const board = {_id: _id, title: title, department: department}
        const result = await boardService.createBoard(board);
        if(result) {
            res.status(201).json({message: 'Create Board Successfull', board: result})
        } else {
            throw new errorResponse(400, 'Create Board Failed')
        }
    }
}

const getBoardById = async(req, res) => {
    const _id = req.params._id;
    const result = await boardService.findBoardById(_id);
    if(result) {
        res.status(200).json({message: 'Get Item Successfull', board: result})
    } else {
        throw new errorResponse(400, 'Get Item Failed')
    }
}

const getAllBoard = async(req, res) => {
    const result = await boardService.findBoardAll();
    if(result) {
        res.status(200).json({message: 'Get All Item Successfull', board: result})
    } else {
        throw new errorResponse(400, 'Get All Item Failed')
    }
}

const deleteBoardById = async(req, res) => {
    const _id = req.params._id;
    const result = await boardService.deleteBoardById(_id);
    if(result) {
        res.status(200).json({message: 'Delete Item Successfull'})
    } else {
        throw new errorResponse(400, 'Delete Item Failed')
    }
}

const updateBoardById = async(req, res) => {
    const _id = req.params._id;
    const title = req.body.title
    const department_id = req.body.department_id
    const department = await departmentService.getDepartmentByIdWithOrtherController(department_id);
    if(!title || !department_id) {
        throw new errorResponse(400, 'Please fill all information')
    } else if(!department) {
        throw new errorResponse(400, 'Department does not exists')
    } else {
        const board = {_id: _id, title: title, department: department}
        const result = await boardService.updateBoardById(board);
        if(result) {
            res.status(200).json({message: 'Update Item Successfull', board: result})
        } else {
            throw new errorResponse(400, 'Update Item Failed')
        }
    }    
}

const getAllBoardWithDepartment = async(req, res) => {
    const result = await boardService.findBoardWithDepartment();
    if(result) {
        return res.status(200).json({message: 'Get all board with department successfull', board: result})
    } else {        
        throw new errorResponse(400, 'Get all board with department failed')
    }
}

const getBoardByIdWithDepartment = async(req, res) => {
    const _id = req.params._id
    const result = await boardService.findBoardByIdWithDepartment(_id);
    if(result) {
        return res.status(200).json({message: 'Get one board with department successfull', board: result})
    } else {
        throw new errorResponse(400, 'Get one board with department failed')
    }
}

module.exports = {postBoard, getBoardById, getAllBoard, deleteBoardById, updateBoardById, getAllBoardWithDepartment, getBoardByIdWithDepartment}