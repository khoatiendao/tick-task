const Model = require('../models/userModel')

const cronService = {
    // async initCron(time) {
    //     const time = cron.time
    //     const cron_db = await Model.cronModel.findOne({})
    // },

    async getCron() {
        const result = await Model.cronModel.findOne();
        return result
    }
}

module.exports = cronService