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

    async updateMemberById(member) {
        const _id = member._id;
        const newValues = {
            user: member.email,
            position: member.position_id,
            department: member.department_id
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