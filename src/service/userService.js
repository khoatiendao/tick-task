const Model = require('../models/userModel')

const userService = {
    async findUserById(_id) {
        const result = await Model.userModel.findById(_id).exec()
        return result;
    },

    async findEmailUser(email) {
        const result = await Model.userModel.findOne({email})
        return result;
    }
}

module.exports = userService