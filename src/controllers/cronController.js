const cronService = require('../service/cronService')
const convert = require('../utils/cron/changetime')
const {generateUUIDWithCharacter} = require('../utils/generateUUID')


const startCron = async(req, res) => {
    try {
        const {minute, hour, dayOfMonth, month, dayOfWeek, enable} = req.body;
        const _id = generateUUIDWithCharacter("CJ")
        const time = convert.timeCronJob(minute, hour, dayOfMonth, month, dayOfWeek)
        const statusCron = {_id: _id, time: time, enable: enable}
        const result = await cronService.createCron(statusCron)
        if(result) {
            return res.status(200).json({message: 'Cron is start with the time you set successfull', statusCron: result})
        } else {
            return res.status(400).json({message: 'Cron start failed'})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
        console.log(error)
    }
}

const getDataCron = async(req, res) => {
    try {
        const result = await cronService.getCron()
        if(result) {
            return res.status(200).json({message: 'Get data cron successfull', statusCron: result})
        } else {
            return res.status(400).json({message: 'Get data cron failed'})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
        console.log(error)
    }
}

const updateTime = async(req, res) => {
    try {
        const {minute, hour, dayOfMonth, month, dayOfWeek} = req.body;
        const time = convert.timeCronJob(minute, hour, dayOfMonth, month, dayOfWeek)
        const result = await cronService.updateTimeCron(time)
        if(result) {
            return res.status(200).json({message: 'Cron is start with the time you update successfull', statusCron: result})
        } else {
            return res.status(400).json({message: 'Cron is start with the time you update failed'})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
        console.log(error)
    }
}

const updateStatusCron = async(req, res) => {
    try {
        const enable = req.body.enable
        if(enable === true) {
            return res.status(400).json({message: 'Cron job is starting please turn off if you dont want use it'})
        } else {
            const result = await cronService.updateStatus(enable)
            if(result) {
                return res.status(200).json({message: 'Cron job is stop successfull', statusCron: result})
            } else {
                return res.status(200).json({message: 'Cron job is stop failed'})
            }
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
        console.log(error)
    }
}

module.exports = {startCron, getDataCron, updateTime, updateStatusCron}