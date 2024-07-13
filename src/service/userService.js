const Model = require('../models/userModel')

const userService = {
    async findUserById(_id) {
        const result = await Model.userModel.findById(_id).exec()
        return result;
    },

    async findEmailUser(email) {
        const result = await Model.userModel.findOne({email})
        return result;
    },

    async update(_id, user) {
        const newValues = {
            name: user.name,
            email: user.email,
            password: user.password,
            gender: user.gender,
            phone: user.phone,
            address: user.address
        }
        const result = await Model.userModel.findByIdAndUpdate(_id, newValues, {new: true})
        return result;
    },

    async updateRole(_id, user) {
        const newValues = {
            role: user.role
        }
        const result = await Model.userModel.findByIdAndUpdate(_id, newValues, {new: true})
        return result;
    }


}

module.exports = userService