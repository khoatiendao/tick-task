const errorResponse = require('../helpers/errorResponse');
const departmentService = require('../service/departmentService');
const {generateUUIDTimeWithCharacter} = require('../utils/generateUUID')

const createOneDepartment = async(req, res) => {
    const name = req.body.name;
    const _id = generateUUIDTimeWithCharacter(name);
    const department = {_id: _id, name: name}
    if (!name) {
        throw new errorResponse(400, 'Please fill all information')
    } else {
        const result = await departmentService.createDepartment(department);
        if(result) {
            return res.status(201).json({message: 'Create Department Successfull', department: result})
        } else {
            throw new errorResponse(400, 'Create Department Failed')
        }
    }
}

const getAllDepartment = async(req, res) => {
    const result = await departmentService.getAllDepartment();
    if(result) {
        return res.status(200).json({message: 'Get Item Successfull', department: result})
    } else {
        throw new errorResponse(400, 'Get Item Failed')
    }
}

const getOneDepartment = async(req, res) => {
    const _id = req.params._id;
    const result = await departmentService.getDepartmentById(_id);
    if(result) {
        return res.status(200).json({message: 'Get One Department Successfull', department: result})
    } else {
        throw new errorResponse(400, 'Get Department One Failed')
    }
}

const deleteOneDepartment = async(req, res) => {
    const _id = req.params._id;
    const result = await departmentService.deleteDepartmentById(_id);
    if(result) {
        res.status(200).json({message: 'Delete One Department Successfull'})
    } else {
        throw new errorResponse(400, 'Delete Department Failed')
    }
}

module.exports = {createOneDepartment, getAllDepartment, getOneDepartment, deleteOneDepartment}