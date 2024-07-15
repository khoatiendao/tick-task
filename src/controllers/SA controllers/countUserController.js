const userCountService = require('../../service/SA service/userCountService')

const countUserActive = async(req, res) => {
    try {
        const result = await userCountService.getActiveUser()
        if(result) {
            return res.status(200).json({message: 'Count user active successfull', user: result})
        } else {
            return res.status(400).json({message: 'Count user active failed'})
        }
    } catch (error) {
        res.status(500)
        console.log(error);
    }
}

module.exports = {countUserActive}