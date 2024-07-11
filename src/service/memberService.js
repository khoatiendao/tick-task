const Model = require('../models/userModel')

const memberService = {
    async createMember(member) {
        const result = await Model.membersModel.create(member);
        return result;
    },

    async getAllMember() {
        const result = await Model.membersModel.find({}).exec();
        return result;
    },

    async getMemberById(_id) {
        const result = await Model.membersModel.findById(_id).exec();
        return result;
    },

    async getMemberIdWithOtherController(member_id) {
        const result = await Model.membersModel.findById(member_id).exec();
        return result;
    },

    async getAllWithUserAndPositionAndDepartment() {
        const result = await Model.membersModel.find({}).populate('user').populate('position').populate('department')
        return result;
    },

    async getIdWithUserAndPositionAndDepartment(_id) {
        const result = await Model.membersModel.findById(_id).populate('user').populate('position').populate('department')
        return result;
    },

    async getAllEmailAndNamePositionAndNameDepartment() {
        const result = await Model.membersModel.find({})
        .populate({path: 'user', select: 'email'})
        .populate({path: 'position', select: 'name'})
        .populate({path: 'department', select: 'name'});
        return result;
    },

    async getIdEmailAndNamePositionAndNameDepartment(_id) {
        const result = await Model.membersModel.findById(_id)
        .populate({path: 'user', select: 'email'})
        .populate({path: 'position', select: 'name'})
        .populate({path: 'department', select: 'name'});
        return result;
    },

    async updateMemberById(_id, member) {
        const newValues = {
            user: member.email,
            position: member.position,
            department: member.department
        }
        const result = await Model.membersModel.findByIdAndUpdate(_id, newValues, {new: true})
        return result;
    },

    async deleteMemberById(_id) {
        const result = await Model.membersModel.findByIdAndDelete(_id).exec();
        return result;
    }
}

module.exports = memberService