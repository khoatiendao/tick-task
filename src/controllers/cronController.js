const cronService = require('../service/cronService')
const convert = require('../utils/cron/changetime')
const {generateUUIDWithCharacter} = require('../utils/generateUUID')


const startCron = async(req, res) => {
    try {
        const {name, minute, hour, dayOfMonth, month, dayOfWeek, enable} = req.body;
        const _id = generateUUIDWithCharacter('CJ')
        const time = convert.timeCronJob(minute, hour, dayOfMonth, month, dayOfWeek)
        const statusCron = {_id: _id, name: name, time: time, enable: enable}
        const result = await cronService.createCron(statusCron)
        if(result) {
            return res.status(200).json({message: 'Cron will start with the time you set successfull', statusCron: result})
        } else {
            return res.status(400).json({message: 'Cron start failed'})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
        console.log(error)
    }
}

const getAllDataCron = async(req, res) => {
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

const getCronById = async(req, res) => {
    try {
        const _id = req.params._id
        const result = await cronService.getCronById(_id)
        if(result) {
            return res.status(200).json({message: 'Get cron by id successfull', statusCron: result})
        } else {
            return res.status(400).json({message: 'Get cron by id failed'})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
        console.log(error)
    }
}

const updateName = async(req, res) => {
    try {
        const _id = req.params._id
        const name = req.body.name
        const result = await cronService.updateNameCron(_id, name)
        if(result.error) {
            return res.status(400).json({message: result.error})
        } else {
            return res.status(200).json({message: 'Update name for cron successfull', statusCron: result})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
        console.log(error)
    }
}

const updateTime = async(req, res) => {
    try {
        const _id = req.params._id
        const {minute, hour, dayOfMonth, month, dayOfWeek} = req.body;
        const time = convert.timeCronJob(minute, hour, dayOfMonth, month, dayOfWeek)
        const result = await cronService.updateTimeCron(_id, time)
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
        const _id = req.params._id
        const enable = req.body.enable
        const result = await cronService.updateStatus(_id, enable)
        if(result.error) {
            return res.status(200).json({message: result.error})
        }
        
        if(enable === true) {
            return res.status(200).json({message: 'Cron job is started successfully', statusCron: result})
        } else if (enable === false) {
            return res.status(200).json({message: 'Cron job is stop successfully', statusCron: result})
        } else {
            return res.status(400).json({message: 'Invalid enable value'})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
        console.log(error)
    }
}

module.exports = {startCron, getAllDataCron, updateTime, updateStatusCron, updateName ,getCronById}