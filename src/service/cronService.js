const Model = require('../models/userModel')
const cronJob = require('../utils/cron/cronJobSendMail')

const cronService = {
    async createCron(statusCron) {
        const result = await Model.cronModel.create(statusCron)
        const timeCron = statusCron.time
        if(!result) {
            throw new Error("Something wrong about save document")
        } 
        cronJob.startCronJob(timeCron)
        return result;
    },

    async getCron() {
        const result = await Model.cronModel.findOne();
        return result;
    },

    async updateTimeCron(time) {
        const result = await Model.cronModel.updateOne({time: time})
        if(result) {
            cronJob.startCronJob(time)
        }
        return result;
    },

    async updateStatus(enable) {
        const result = await Model.cronModel.updateOne({enable: enable})
        if(result && enable.false) {
            cronJob.stopCronJob()
        }
        return result;
    }
}

module.exports = cronService