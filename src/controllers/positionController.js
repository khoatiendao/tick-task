const positionService = require('../service/positionService')
const generateUUID = require('../utils/generateUUID')

const createOnePosition = async(req, res) => {
    try {
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
            return res.status(400).json({message: 'Create one position failed'})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
        console.log(error);
    }
}

const getOnePosition = async(req, res) => {
    try {
        const _id = req.params._id
        const result = await positionService.getPosition(_id);
        if(result) {
            return res.status(200).json({message: 'Get one position successfull', position: result})
        } else {
            return res.status(400).json({message: 'Get one position failed'})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
        console.log(error);
    }
}

const getAllPosition = async(req, res) => {
    try {
        const result = await positionService.findAllPosition();
        if(result) {
            return res.status(200).json({message: 'Get all postion succesfull', position: result})
        } else {
            return res.status(400).json({message: 'Get all postion failed'})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
        console.log(error);
    }
}

const updateOnePosition = async(req, res) => {
    try {
        const _id = req.params._id;
        const name = req.body.name;
        const postion = {
            name: name
        }
        const result = await positionService.updatePosition(_id, postion)
        if(result) {
            return res.status(200).json({message: 'Update one position succesfull', position: result })
        } else {
            return res.status(400).json({message: 'Update one position failed'})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
        console.log(error);
    }
}

const deleteOnePosition = async(req, res) => {
    try {
        const _id = req.params._id;
        const result = await positionService.deletePosition(_id);
        if(result) {
            return res.status(200).json({message: 'Delete one position successfull'})
        } else {
            return res.status(400).json({message: 'Delete one position failed'})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
        console.log(error);
    }
}

module.exports = {createOnePosition, getOnePosition, getAllPosition, updateOnePosition, deleteOnePosition}