const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

const router = express.Router();
const taskController = require('../controllers/taskController');
const{protect}=require('../middleware/auth');
const { validateTask, validateTaskUpdate, validateTaskID, handleValidationErrors } = require('../middleware/validators');

//getting all tasks
router.get('/tasks', protect, handleValidationErrors, asyncHandler(taskController.getTasks));

//getting a specific task
router.get('/tasks/:id', protect,validateTaskID, handleValidationErrors, asyncHandler(taskController.getTaskById));

//creating a new task
router.post('/tasks',protect, validateTask, handleValidationErrors, asyncHandler(taskController.createTask));

//updating a task
router.put('/tasks/:id', protect,validateTaskUpdate, handleValidationErrors, asyncHandler(taskController.updateTask));

//deleting a task
router.delete('/tasks/:id',protect, validateTaskID, handleValidationErrors, asyncHandler(taskController.deleteTask));

//marking task as status
router.patch('/tasks/:id/status',protect, validateTaskID, handleValidationErrors, asyncHandler(taskController.updateTaskStatus));

module.exports = router;
