const memberService = require('../service/memberService');
const userService = require('../service/userService');
const positionService = require('../service/positionService')
const departmentService = require('../service/departmentService')
const generateUUID = require('../utils/generateUUID')
const validator = require('validator')

const createOneMember = async(req, res) => {
    try {
        const _id = generateUUID.generateUUIDWithCharacter('MB')
        const email = req.body.email
        const position_id = req.body.position_id
        const department_id = req.body.department_id
        const findEmailUser = await userService.findEmailUser(email);
        const position = await positionService.getPositionByMember(position_id);
        const department = await departmentService.getDepartmentByIdWithOrtherController(department_id)
        if(!email || !position_id || !department_id) {
            return res.status(400).json({message: 'Please fill all information'})
        } else if(!validator.isEmail(email)) {
            return res.status(400).json({message: 'Email must be a valid email'})
        } else if(!findEmailUser) {
            return res.status(400).json({message: 'Email does not exists'})
        } else if(!position) {
            return res.status(400).json({message: 'Position does not exists'})
        } else if(!department) {
            return res.status(400).json({message: 'Department does not exists'})
        } else {
            const member = {
                _id: _id,
                user: findEmailUser,
                position: position,
                department: department
            }
            const result = await memberService.createMember(member);
            if(result) {
                return res.status(201).json({message: 'Create member Successfull', member: result})
            } else {
                return res.status(400).json({message: 'Create member Failed'})
            }
        }
    } catch (error) {
        res.status(500)
        console.log(error)
    }
}

const getOneMember = async(req, res) => {
    try {
        const _id = req.params._id
        const result = await memberService.getMemberById(_id);
        if(result) {
            return res.status(200).json({message: 'Get one member successfull', member: result})
        } else {
            return res.status(400).json({message: 'Get one member failed'})
        }
    } catch (error) {
        res.status(500)
        console.log(error);
    }
}

const getAllMember = async(req, res) => {
    try {
        const result = await memberService.getAllMember();
        if(result) {
            return res.status(200).json({message: 'Get all member successfull', member: result})
        } else {
            return res.status(400).json({message: 'Get all member failed'})
        }
    } catch (error) {
        res.status(500)
        console.log(error);
    }
}

const updateOneMember = async(req, res) => {
    try {
        const _id = req.params._id
        const email = req.body.email
        const position_id = req.body.position_id
        const department_id = req.body.department_id
        const findEmailUser = await userService.findEmailUser(email);
        const position = await positionService.getPositionByMember(position_id);
        const department = await departmentService.getDepartmentByIdWithMember(department_id);
        if(!email || !position_id || !department_id) {
            return res.status(400).json({message: 'Please fill all information'})
        } else if(!validator.isEmail(email)) {
            return res.status(400).json({message: 'Email must be a valid email'})
        } else if (!findEmailUser) {
            return res.status(400).json({message: 'Email does not exists'})
        } else if (!position) {
            return res.status(400).json({message: 'Position dose not exists'})
        } else if (!department) {
            return res.status(400).json({message: 'Department does not exists'})
        } else {
            const member = {
                user: findEmailUser,
                position: position,
                department: department
            }
            const result = await memberService.updateMemberById(_id, member);
            if(result) {
                return res.status(200).json({message: 'Update one member successfull', member: result})
            } else {
                return res.status(400).json({message: 'Update one member failed'})
            }
        }
    } catch (error) {
        res.status(500)
        console.log(error)
    }
}

const deleteOneMember = async(req, res) => {
    try {
        const _id = req.params._id;
        const result = await memberService.deleteMemberById(_id)
        if(result) {
            return res.status(200).json({message: 'Delete one member successfull'})
        } else {
            return res.status(400).json({message: 'Delete one member failed'})
        }
    } catch (error) {
        res.status(500)
        console.log(error);
    }
}

module.exports = {createOneMember, getOneMember, getAllMember, updateOneMember, deleteOneMember}