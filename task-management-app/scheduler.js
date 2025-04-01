// filepath: c:\Users\teddy\OneDrive\Desktop\PROJECT 3\task-management-app\scheduler.js
const schedule = require('node-schedule');
const Task = require('./models/Task');

// Schedule a job to check for upcoming deadlines every day at 9 AM
const scheduleTaskReminders = () => {
    schedule.scheduleJob('0 9 * * *', async () => {
        const now = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(now.getDate() + 1);

        const tasks = await Task.find({
            deadline: { $gte: now, $lt: tomorrow },
            status: 'incomplete',
        });

        if (tasks.length > 0) {
            console.log('Upcoming tasks:', tasks);
            // Add notification logic here (e.g., email or SMS)
        }
    });
};

module.exports = { scheduleTaskReminders };