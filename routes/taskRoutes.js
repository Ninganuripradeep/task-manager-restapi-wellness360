const express=require('express');
const asyncHandler=require('../utils/asyncHandler');
const AppError=require('../utils/AppError');

const router=express.Router();
const taskController=require('../controllers/taskController');
const {protect}=require('../middleware/auth');
const {validateTask, validateTaskUpdate, validateTaskID, handleValidationErrors} = require('../middleware/validators');

// Getting all tasks
router.get('/tasks', protect, handleValidationErrors, asyncHandler(taskController.getTasks));

// Getting a specific task
router.get('/tasks/:id', protect, validateTaskID, handleValidationErrors, asyncHandler(taskController.getTaskById));

// Creating a new task
router.post('/tasks', protect, validateTask, handleValidationErrors, asyncHandler(taskController.createTask));

// Updating a task
router.put('/tasks/:id', protect, validateTaskUpdate, handleValidationErrors, asyncHandler(taskController.updateTask));

// Deleting a task
router.delete('/tasks/:id', protect, validateTaskID, handleValidationErrors, asyncHandler(taskController.deleteTask));

// Marking task as status
router.patch('/tasks/:id/status', protect, validateTaskID, handleValidationErrors, asyncHandler(taskController.updateTaskStatus));

module.exports = router;
