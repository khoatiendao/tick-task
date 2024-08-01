const Model = require('../models/userModel')
const cron = require('node-cron')
let currentJob = null;

const cronService = {
    // async startCron(time) {
    //     const cron_db = await Model.cronModel.findOne({})
    //     if(cron_db && cron_db.enable) {
    //         currentJob = cron.schedule(time, async () => {
    //             const now = new Date();
    //             const taskUpComingDeadline = new Date(
    //               now.getTime() + 24 * 60 * 60 * 1000
    //             ); // 24 giờ
    //             try {
    //               // Tìm các task có deadline trong 24 giờ
    //               const taskListsDeadline = await Model.taskListModel.find({
    //                 duedate: { $gte: now, $lte: taskUpComingDeadline },
    //               });
          
    //               const tasksByMember = {};
          
    //               for (let task of taskListsDeadline) {
    //                 const taskAssignments = await Model.taskAssignmentModel
    //                   .findOne({ taskList: task._id })
    //                   .populate('member')
    //                   .exec();
    //                 if (Array.isArray(taskAssignments.taskList) && taskAssignments.taskList.length > 0) {
    //                   for (let taskAssignment of taskAssignments.taskList) {
    //                     if (Array.isArray(taskAssignments.member)) {
    //                       for (let member of taskAssignments.member) {
    //                         const memberId = member._id;
    //                         if (!tasksByMember[memberId]) {
    //                           tasksByMember[memberId] = {
    //                             member: await Model.membersModel
    //                               .findById(memberId)
    //                               .populate('user')
    //                               .exec(),
    //                             tasks: [],
    //                           };
    //                         }
    //                         tasksByMember[memberId].tasks.push(task);
    //                       }
    //                     } else {
    //                       const memberId = taskAssignments.member._id;
    //                       if (!tasksByMember[memberId]) {
    //                         tasksByMember[memberId] = {
    //                           member: await Model.membersModel
    //                             .findById(memberId)
    //                             .populate('user')
    //                             .exec(),
    //                           tasks: [],
    //                         };
    //                       }
    //                       tasksByMember[memberId].tasks.push(task);
    //                     }
    //                   }
    //                 }
    //               }
          
    //               for (let memberId of Object.keys(tasksByMember)) {
    //                 const member = tasksByMember[memberId].member;
    //                 const tasks = tasksByMember[memberId].tasks;
    //                 if (member && member.user && member.user.email) {
    //                   const emailUser = member.user.email;
    //                   const taskDetail = {
    //                     name: member.user.name,
    //                     tasks: tasks.map((task) => ({
    //                       title: task.title,
    //                       description: task.description,
    //                       duedate: format(
    //                         new Date(task.duedate),
    //                         'dd/MM/yyyy - HH:mm:ss',
    //                         { locale: vi }
    //                       ),
    //                     })),
    //                   };
    //                   await createMail.sendMailTask(emailUser, taskDetail);
    //                 }
    //               }
    //               if (job) {
    //                 job.stop();
    //                 console.log(
    //                   'Sending mail for all user about task duedate and stop cron job'
    //                 );
    //               }
    //             } catch (error) {
    //               console.error('Error fetching task or sending mails', error);
    //             }
    //         });
    //     }
    // },

    async getCron() {
        const result = await Model.cronModel.findOne();
        return result
    }
}

module.exports = cronService