const taskCountService = require('../../service/SA service/taskCountService')

const countStatusPending = async(req, res) => {
    try {
        const result = await taskCountService.taskStatusPending()
        if(result) {
            return res.status(200).json({message: 'Count task pending successfull', taskList: result})
        } else {
            return res.status(200).json({message: 'Count task pending successfull', taskList: result})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
        console.log(error);
    }
}

const countStatusInProcess = async(req, res) => {
    try {
        const result = await taskCountService.taskStatusInProcess()
        if(result) {
            return res.status(200).json({message: 'Count task In Process successfull', taskList: result})
        } else {
            return res.status(200).json({message: 'Count task In Process successfull', taskList: result})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
        console.log(error);
    }
}

const countStatusCompleted = async(req, res) => {
    try {
        const result = await taskCountService.taskStatusCompleted()
        if(result) {
            return res.status(200).json({message: 'Count task Completed successfull', taskList: result})
        } else {
            return res.status(200).json({message: 'Count task Completed successfull', taskList: result})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
        console.log(error);
    }
}

const countTaskSum = async(req, res) => {
    try {
        const result = await taskCountService.sumTask()
        if(result) {
            return res.status(200).json({message: 'Count task successfull', taskList: result})
        } else {
            return res.status(200).json({message: 'Count task successfull', taskList: result})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
        console.log(error);
    }
}

module.exports = {countStatusPending, countStatusInProcess, countStatusCompleted, countTaskSum}