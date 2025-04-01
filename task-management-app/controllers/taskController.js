const Task = require('../models/Task');

// Get all tasks
const getTasks = async (req, res) => {
    const { category, status, priority, sortBy, page = 1, limit = 10 } = req.query;
    const filter = { userId: req.userId }; // Filter tasks by logged-in user

    // Add filters based on query parameters
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    try {
        // Pagination and sorting
        const tasks = await Task.find(filter)
            .sort(sortBy ? { [sortBy]: 1 } : {}) // Sort by field (e.g., deadline, priority)
            .skip((page - 1) * limit) // Skip tasks for pagination
            .limit(parseInt(limit)); // Limit the number of tasks per page

        const totalTasks = await Task.countDocuments(filter); // Total tasks for pagination
        res.json({
            tasks,
            totalTasks,
            totalPages: Math.ceil(totalTasks / limit),
            currentPage: parseInt(page),
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new task
const createTask = async (req, res) => {
    const { title, description, category, deadline } = req.body;
    try {
        const newTask = new Task({ title, description, category, deadline });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a task
const updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };