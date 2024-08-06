const cron = require('node-cron');
const Model = require('../../models/userModel');
const { format } = require('date-fns');
const { vi } = require('date-fns/locale');
const createMail = require('../../config/configMail');

const cronAutoDoJob = {
  startCronJob(timeCron) {
    const taskCron = cron.schedule(timeCron, async () => {
      console.log("Cron job is starting");
      const now = new Date();
      const taskUpComingDeadline = new Date(
        now.getTime() + 24 * 60 * 60 * 1000
      ); // 24 giờ
      try {
        // Tìm các task có deadline trong 24 giờ
        const taskListsDeadline = await Model.taskListModel.find({
          duedate: { $gte: now, $lte: taskUpComingDeadline },
        });
        
        const tasksByMember = {};

        for (let task of taskListsDeadline) {
          const taskAssignments = await Model.taskAssignmentModel.find({ taskList: task._id }).populate('member').exec();
          
          taskAssignments.forEach(taskAssignment => {
            const members = Array.isArray(taskAssignment.member) ? taskAssignment.member : [taskAssignment.member]

            members.forEach(async member => {
              const memberId = member._id
              if(!tasksByMember[memberId]) {
                tasksByMember[memberId] = {
                  member: await Model.membersModel
                    .findById(memberId)
                    .populate('user')
                    .exec(),
                  tasks: [],
                };
              }
              tasksByMember[memberId].tasks.push(task)  
            })
          });
        }

        for (let memberId of Object.keys(tasksByMember)) {
          const member = tasksByMember[memberId].member;
          const tasks = tasksByMember[memberId].tasks;
          if (member && member.user && member.user.email) {
            const emailUser = member.user.email;
            const taskDetail = {
              name: member.user.name,
              tasks: tasks.map((task) => ({
                title: task.title,
                description: task.description,
                duedate: format(
                  new Date(task.duedate),
                  'dd/MM/yyyy - HH:mm:ss',
                  { locale: vi }
                ),
              })),
            };
            await createMail.sendMailTask(emailUser, taskDetail);
          }
        }
      } catch (error) {
        console.error('Error fetching task or sending mails', error);
      }
    });

    taskCron.start();
  },

  stopCronJob(timeCron) {
    const taskCron = this.startCronJob(timeCron)
    console.log("Cron job stop");
    taskCron.stop()
  }
};

module.exports = cronAutoDoJob;
