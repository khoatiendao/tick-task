const Model = require('../models/userModel');
const cronJob = require('../utils/cron/cronJobSendMail')

const cronService = {
    async createCron(statusCron) {
        const nameCron = await Model.cronModel.findOne({name: statusCron.name})
        if(nameCron) {
            return {error: "Name is exists"};
        }
        const result = await Model.cronModel.create(statusCron)
        if(!result) {
            return {error: "Please check input data"}
        } 
        const timeCron = result.time
        cronJob.startCronJob(timeCron)
        return result;
    },

    async getCron() {
        const result = await Model.cronModel.find({});
        return result;
    },

    async getCronById(_id) {
        const result = await Model.cronModel.findById(_id).exec()
        return result
    },

    async updateNameCron(_id, name) {
        const findIdCron = await Model.cronModel.findById(_id).exec()
        if(!findIdCron) {
            return {error: "Cron is not exists"}
        }
        const result = await Model.cronModel.updateOne({name: name})
        if(!result) {
            return {error: "Something wrong about update name"}
        }
        return result
    },

    async updateTimeCron(_id, time) {
        const findIdCron = await Model.cronModel.findById(_id).exec()
        if(!findIdCron) {
            return {error: "Cron is not exists"}
        }
        const result = await Model.cronModel.updateOne({time: time})
        if(!result) {
            return {error: "Something wrong about update time"}
        }
        cronJob.startCronJob(time)
        return result;
    },

    async updateStatus(_id, enable) {
        const findIdCron = await Model.cronModel.findById(_id).exec()
        if(!findIdCron) {
            return {error: "Cron is not exists"}
        }

        if(findIdCron.enable === enable) {
            return {error: `Cron job is already ${findIdCron.enable}`}
        }

        switch (findIdCron.enable !== enable) {
            case enable === false:
                const stopCron = await Model.cronModel.findByIdAndUpdate(_id, {enable: enable}, {new: true})
                cronJob.stopCronJob();
                return stopCron
            case enable === true:
                const time = findIdCron.time;
                const startCron = await Model.cronModel.findByIdAndUpdate(_id, {enable: enable}, {new: true})
                cronJob.startCronJob(time)
                return startCron
            default:
                return {error: "Invalid enable value"}
        }
    },

    // async initCronJobs() {
    //     const cronEnable = await Model.cronModel.find({enable: true}).exec()
    //     if(!cronEnable) {
    //         return {error: "No cron has enable true to start"}
    //     }

    //     return cronJob.startCronJob(cronEnable.time)
    // }
}

module.exports = cronService