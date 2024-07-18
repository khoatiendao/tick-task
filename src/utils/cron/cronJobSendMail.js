const cron = require('node-cron')
const Model = require('../../models/userModel')
const createMail = require('../../config/configMail')

const cronAutoDoJon = {
    sendMailTaskDeadline() {
        cron.schedule('0 0 * * *', async() => {
            const now = new Date();
            const taskUpComingDeadline = new Date(now.getTime() + 24 * 60 * 60 * 1000) // 24 giờ
            try {

                // Tìm các task có deadline trong 24 giờ
                const taskListsDeadline = await Model.taskListModel.find({duedate: {$gte: now, $lte: taskUpComingDeadline}})

                for(let task of taskListsDeadline) {
                    const taskAssignment = await Model.taskAssignmentModel.findOne({taskList: task._id}).populate('member').exec()
                    if(taskAssignment) {
                        const member = await Model.membersModel.findById(taskAssignment.member._id).populate('user').exec()
                        if(member && member.user && member.user.email) {
                            const emailUser = member.user.email
                            const task = {
                                title: taskListsDeadline.title,
                                description: taskListsDeadline.description

                            }
                            createMail.sendMailTask(emailUser, task)
                        }
                    }
                }

            } catch (error) {
                console.error('Error fetching task or sending mails', error)
            }
        })

        console.log('Cron job started');
    }
}

module.exports = cronAutoDoJon