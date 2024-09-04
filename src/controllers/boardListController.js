const boardListService = require('../service/boardListService')
const {generateUUIDWithCharacter} = require('../utils/generateUUID')
const boardService = require('../service/boardService')
const errorResponse = require('../helpers/errorResponse');


const createOneBoardList = async(req, res) => {
    const _id = generateUUIDWithCharacter('BL')
    const title = req.body.title
    const board_id = req.body.board_id
    const board = await boardService.findBoardByIdWithOtherController(board_id)
    if(!title || !board_id) {
        throw new errorResponse(400, 'Please fill all information')
    } else if (!board) {
        throw new errorResponse(400, 'Board does not exists')
    } else {
        const boardList = {_id: _id, title: title, board: board}
        const result = await boardListService.create(boardList);
        if(result) {
            return res.status(201).json({message: 'Create Board List Successfull', boardList: result})
        } else {
            throw new errorResponse(400, 'Create Board List Failed')
        }
    }
}

const getOneBoardList = async(req ,res) => {
    const _id = req.params._id;
    const result = await boardListService.getById(_id);
    if(result) {
        return res.status(200).json({message: 'Get Item Successfull', boardList: result})
    } else {
        throw new errorResponse(400, 'Get Item Failed')
    }
}

const getAllBoardList = async(req, res) => {
    const result = await boardListService.getAll();
    if(result) {
        return res.status(200).json({message: 'Get All Item Successfull', boardList: result})
    } else {
        throw new errorResponse(400, 'Get All Item Failed')
    }
}

const updateOneBoardList = async(req, res) => {
    const _id = req.params._id;
    const title = req.body.title
    const board_id = req.body.board_id
    const board = await boardService.findBoardByIdWithOtherController(board_id);
    if(!title || !board_id) {
        throw new errorResponse(400, 'Please fill all information')
    } else if(!board) {
        throw new errorResponse(400, 'Board does not exists')
    } else {
        const boardList = {
            title: title,
            board: board
        }
        const result = await boardListService.updateById(_id, boardList);
        if(result) {
            return res.status(200).json({message: 'Update Board List Successfull', boardList: result})
        } else {
            throw new errorResponse(400, 'Update Board List Failed')
        }
    }
}

const deleteOneBoardList = async(req, res) => {
    const _id = req.params._id
    const result = boardListService.deleteById(_id);
    if(result) {
        return res.status(200).json({message: 'Delete One Board List Successfull'})
    } else {
        throw new errorResponse(400, 'Delete One Board List Failed')
    }
}

const getAllBoardListWithBoardAndDepartment = async(req, res) => {
    const result = await boardListService.getAllWithBoardAndDepartment();
    if(result) {
        return res.status(200).json({message: 'Get all board list with board and department successfull', boardList: result})
    }else {
        throw new errorResponse(400, 'Get all board list with board and department failed')
    }    
}

const getIdBoardListWithBoardAndDepartment = async(req, res) => {
    const _id = req.params._id
    const result = await boardListService.getIdWithBoardAndDepartment(_id);
    if(result) {
        return res.status(200).json({message: 'Get one board list with board and department successfull', boardList: result})
    }else {
        throw new errorResponse(400, 'Get one board list with board and department failed')
    }
}

module.exports = {createOneBoardList, getOneBoardList, getAllBoardList, updateOneBoardList, deleteOneBoardList, getAllBoardListWithBoardAndDepartment, getIdBoardListWithBoardAndDepartment}