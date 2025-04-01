const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    deadline: { type: Date },
    status: { type: String, enum: ['complete', 'incomplete'], default: 'incomplete' },
});

module.exports = mongoose.model('Task', TaskSchema);
priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' }