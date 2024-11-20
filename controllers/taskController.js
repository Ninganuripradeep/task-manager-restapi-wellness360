const Task = require('../Models/Task');


const { AppError } = require('../utils/AppError');


// getting all tasks
exports.getTasks = async (req, res, next) => {
    try {
        const { due_date, status, sort } = req.query;

        // Create a filter object
        let filter = {};

        // Add due_date filter if provided
        if (due_date) {
            const parsedDate = new Date(due_date);
            if (isNaN(parsedDate)) {
                return next(new AppError('Invalid due_date format', 400));
            }
            filter.due_date = parsedDate;
        }

        // Add status filter if provided
        if (status) {
            if (!['pending', 'in_progress', 'completed'].includes(status)) {
                return next(new AppError('Invalid status value. Status must be one of: pending, in_progress, completed.', 400));
            }
            filter.status = status;
        }

        // Determine the sort order
        let sortOrder = {};
        if (sort) {
            if (sort === 'asc') {
                sortOrder.due_date = 1;  // Ascending order
            } else if (sort === 'desc') {
                sortOrder.due_date = -1; // Descending order
            } else {
                return next(new AppError('Invalid sort value. Use "asc" or "desc".', 400));
            }
        }

        // Find tasks with the applied filters and sorting
        const tasks = await Task.find(filter).sort(sortOrder);

        res.status(200).json({
            status: 'success',
            message: 'Tasks fetched successfully!',
            data: tasks
        });
    } catch (err) {
        next(err);
    }
};


// getting a specific task
exports.getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return next(new AppError('Task not found', 404));
        }
        res.status(200).json({
            status: 'success',
            message: 'Task fetched successfully!',
            data: task
        });
    } catch (err) {
        next(err);
    }
};

//  creating a new task
exports.createTask = async (req, res, next) => {
    try {
        const { title, description, due_date } = req.body;
        
        const existingTask=await Task.findOne({title});
        if(existingTask){
            return next(new AppError('A task with the title already exists',400));
        }

        const newTask = new Task({
            title,
            description,
            due_date
        });
        await newTask.save();
        res.status(201).json({
            status: 'success',
            message: 'Task created successfully!',
            data: newTask
        });
    } catch (err) {
        next(err);
    }
};

//  updating a task
exports.updateTask = async (req, res, next) => {
    try {
        const { title,due_date } = req.body;
        if (title) {
            const existingTask = await Task.findOne({ title, _id: { $ne: req.params.id } });
            if (existingTask) {
                return next(new AppError('A task with this title already exists', 400));
            }
        }

        if (due_date) {
            const task = await Task.findById(req.params.id);
            if (!task) {
                return next(new AppError('Task not found', 404));
            }

            const updatedDueDate = new Date(due_date);
            if (updatedDueDate <= task.created_at) {
                return next(new AppError('Due date must be after the creation date', 400));
            }
        }


        const taskUpdate = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!taskUpdate) {
            throw new AppError('Task not found', 404);
        }
        res.status(200).json({
            status: 'success',
            message: 'Task updated successfully!',
            data: updatedTask
        });
    } catch (err) {
        next(err);
    }
};

//  deleting a task
exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            throw new AppError('Task not found', 404);
        }
        res.status(200).json({
            status: 'success',
            message: 'Task deleted successfully!',
            data: null  
        });
    } catch (err) {
        next(err);
    }
};




//updating a task status
exports.updateTaskStatus = async (req, res, next) => {
    const { status } = req.body;

  
    if (!['pending', 'in_progress', 'completed'].includes(status)) {
        return next(new AppError('Invalid status value. Status must be one of: pending, in_progress, completed.', 400));
    }
    const allowedFields = ['status'];
    const providedFields = Object.keys(req.body);
    const invalidFields = providedFields.filter(field => !allowedFields.includes(field));
    if (invalidFields.length > 0) {
        return next(new AppError(`Invalid fields: ${invalidFields.join(', ')}`, 400));
    }

    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id, 
            { status }, 
            { new: true }
        );
        if (!task) {
            throw new AppError('Task not found', 404, 'NotFoundError');
        }
        res.status(200).json({
            status: 'success',
            message: `Task status updated to ${status}`,
            data: task
        });
    } catch (err){
        next(err);
    }
};

