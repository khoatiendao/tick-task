const Model = require('../../models/userModel')

const getNumberCountWithUser = {
    async getActiveUser() {
        const countUser = await Model.userModel.countDocuments({active: 1});
        return countUser;
    }
}

module.exports = getNumberCountWithUser