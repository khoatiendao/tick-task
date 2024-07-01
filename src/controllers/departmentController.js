const departmentService = require('../service/departmentService');
const {generateUUIDTimeWithCharacter} = require('../utils/generateUUID')

const createOneDepartment = async(req, res) => {
    try {
        const _id = generateUUIDTimeWithCharacter(name);
        const name = req.body.name;
        const department = {_id: _id, name: name}
        if (!name) {
            return res.status(400).json({message: 'Please fill all information'})
        } else {
            const result = await departmentService.createDepartment(department);
            if(result) {
                return res.status(201).json({message: 'Create Department Successfull', department: result})
            } else {
                return res.status(400).json({message: 'Create Department Failed'})
            }
        }
    } catch (error) {
        res.status(500)
        console.log(error)
    }
}

const getAllDepartment = async(req, res) => {
    try {
        const result = await departmentService.getAllDepartment();
        if(result) {
            return res.status(200).json({message: 'Get Item Successfull', department: result})
        } else {
            return res.status(400).json({message: 'Get Item Failed'})
        }
    } catch (error) {
        res.status(500)
        console.log(error)
    }
}

const getOneDepartment = async(req, res) => {
    try {
        const _id = req.params._id;
        const result = await departmentService.getDepartmentById(_id);
        if(result) {
            return res.status(200).json({message: 'Get One Department Successfull', department: result})
        } else {
            return res.status(400).json({message: 'Get Department One Failed'})
        }
    } catch (error) {
        res.status(500)
        console.log(error)
    }
}

const deleteOneDepartment = async(req, res) => {
    try {
        const _id = req.params._id;
        const result = await departmentService.deleteDepartmentById(_id);
        if(result) {
            res.status(200).json({message: 'Delete One Department Successfull'})
        } else {
            res.status(400).json({message: 'Delete Department Failed'})
        }
    } catch (error) {
        res.status(500)
        console.log(error)
    }
}

module.exports = {createOneDepartment, getAllDepartment, getOneDepartment, deleteOneDepartment}