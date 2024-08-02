const Model = require('../models/userModel')

const cronService = {
    async createCron(statusCron) {
        const result = await Model.cronModel.create(statusCron)
        return result
    },

    async getCron() {
        const result = await Model.cronModel.findOne();
        return result;
    },

    async updateTimeCron(time) {
        const result = await Model.cronModel.updateOne({time: time})
        return result;
    },

    async updateStatus(enable) {
        const result = await Model.cronModel.updateOne({enable: enable})
        return result;
    }
}

module.exports = cronService