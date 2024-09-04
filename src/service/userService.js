const Model = require('../models/userModel')

const userService = {
    async findUserById(_id) {
        const result = await Model.userModel.findById(_id).exec()
        return result;
    },

    async findAll() {
        const result = await Model.userModel.find({}).exec()
        return result;
    },

    async findEmailUser(email) {
        const result = await Model.userModel.findOne({email})
        return result;
    },

    async update(_id, user) {
        const newValues = {
            name: user.name,
            gender: user.gender,
            phone: user.phone,
            country: user.country,
            address: user.address,
            district: user.district,
            ward: user.ward,
            city: user.city
        }
        const result = await Model.userModel.findByIdAndUpdate(_id, newValues, {new: true}).select('-email -password -role -active')
        return result;
    },

    async updateRole(_id, user) {
        const newValues = {
            role: user.role
        }
        const result = await Model.userModel.findByIdAndUpdate(_id, newValues, {new: true}).select('-email -password -name -gender -phone -address -active')
        return result;
    }


}

module.exports = userService