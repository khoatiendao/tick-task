const errorResponse = require('../helpers/errorResponse');
const positionService = require('../service/positionService')
const generateUUID = require('../utils/generateUUID')

const createOnePosition = async(req, res) => {
    const _id = generateUUID.generateUUIDWithCharacter('P')
    const name = req.body.name;
    const position = {
        _id: _id,
        name: name
    }
    const result = await positionService.createPosition(position);
    if(result) {
        return res.status(201).json({message: 'Create one position succesfull', position: result})
    } else {
        throw new errorResponse(400, 'Create one position failed')
    }
}

const getOnePosition = async(req, res) => {
    const _id = req.params._id
    const result = await positionService.getPosition(_id);
    if(result) {
        return res.status(200).json({message: 'Get one position successfull', position: result})
    } else {
        throw new errorResponse(400, 'Get one position failed')
    }
}

const getAllPosition = async(req, res) => {
    const result = await positionService.findAllPosition();
    if(result) {
        return res.status(200).json({message: 'Get all postion succesfull', position: result})
    } else {
        throw new errorResponse(400, 'Get all postion failed')
    }
}

const updateOnePosition = async(req, res) => {
    const _id = req.params._id;
    const name = req.body.name;
    const postion = {
        name: name
    }
    const result = await positionService.updatePosition(_id, postion)
    if(result) {
        return res.status(200).json({message: 'Update one position succesfull', position: result })
    } else {
        throw new errorResponse(400, 'Update one position failed')
    }
}

const deleteOnePosition = async(req, res) => {
    const _id = req.params._id;
    const result = await positionService.deletePosition(_id);
    if(result) {
        return res.status(200).json({message: 'Delete one position successfull'})
    } else {
        throw new errorResponse(400, 'Delete one position failed')
    }
}

module.exports = {createOnePosition, getOnePosition, getAllPosition, updateOnePosition, deleteOnePosition}