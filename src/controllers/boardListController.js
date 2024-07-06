const boardListService = require('../service/boardListService')
const {generateUUIDWithCharacter} = require('../utils/generateUUID')
const boardService = require('../service/boardService')



const createOneBoardList = async(req, res) => {
    try {
        const _id = generateUUIDWithCharacter('BL')
        const title = req.body.title
        const board_id = req.body.board_id
        const board = await boardService.findBoardByIdWithOtherController(board_id)
        if(!title || !board_id) {
            return res.status(400).json({message: 'Please fill all information'})
        } else if (!board) {
            return res.status(400).json({message: 'Board does not exists'})
        } else {
            const boardList = {_id: _id, title: title, board: board}
            const result = await boardListService.create(boardList);
            if(result) {
                return res.status(201).json({message: 'Create Board List Successfull', boardList: result})
            } else {
                return res.status(400).json({message: 'Create Board List Failed'})
            }
        }
    } catch (error) {
        res.status(500)
        console.log(error);
    } 
}

const getOneBoardList = async(req ,res) => {
    try {
        const _id = req.params._id;
        const result = await boardListService.getById(_id);
        if(result) {
            return res.status(200).json({message: 'Get Item Successfull', boardList: result})
        } else {
            return res.status(400).json({message: 'Get Item Failed'})
        }
    } catch (error) {
        res.status(500)
        console.log(error);
    }
}

const getAllBoardList = async(req, res) => {
    try {
        const result = await boardListService.getAll();
        if(result) {
            return res.status(200).json({message: 'Get All Item Successfull', boardList: result})
        } else {
            return res.status(400).json({message: 'Get All Item Failed'})
        }
    } catch (error) {
        res.status(500)
        console.log(error);
    }
}

const updateOneBoardList = async(req, res) => {
    try {
        const _id = req.params._id;
        const title = req.body.title
        const board_id = req.body.board_id
        const board = await boardService.findBoardByIdWithOtherController(board_id);
        if(!title || !board_id) {
            return res.status(400).json({message: 'Please fill all information'})
        } else if(!board) {
            return res.status(400).json({message: 'Board does not exists'})
        } else {
            const boardList = {
                title: title,
                board: board
            }
            const result = await boardListService.updateById(_id, boardList);
            if(result) {
                return res.status(200).json({message: 'Update Board List Successfull', boardList: result})
            } else {
                return res.status(400).json({message: 'Update Board List Failed'})
            }
        }
    } catch (error) {
        res.status(500)
        console.log(error);
    }
}

const deleteOneBoardList = async(req, res) => {
    try {
        const _id = req.params._id
        const result = boardListService.deleteById(_id);
        if(result) {
            return res.status(200).json({message: 'Delete One Board List Successfull'})
        } else {
            return res.status(400).json({message: 'Delete One Board List Failed'})
        }
    } catch (error) {
        res.status(500)
        console.log(error);
    }
}

module.exports = {createOneBoardList, getOneBoardList, getAllBoardList, updateOneBoardList, deleteOneBoardList}