const {check,validationResult}=require('express-validator');

// Middleware for task validation
const validateTask=[
    check('title').notEmpty().withMessage('Title is required'),
    check('description').notEmpty().withMessage('Description is required'),
    check('due_date').isISO8601().withMessage('Due date must be a valid date(YYYY-MM-DD format)')
]

// Validator for updating a task (PUT method)
const validateTaskUpdate=[
    check('title').optional().notEmpty().withMessage('Title cannot be empty'),
    check('description').optional().notEmpty().withMessage('Description cannot be empty'),
    check('due_date').optional().isISO8601().withMessage('Due date must be a valid date(YYYY-MM-DD format)'),
    check('status').notEmpty().withMessage('Status is required').isIn(['pending','in_progress','completed']).withMessage('Invalid status value'),
]

// Validator for task ID format
const validateTaskID=[
    check('id').isMongoId().withMessage('Invalid task ID format')
]

// Error handler for validation
const handleValidationErrors=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const formattedErrors=errors.array().map(err=>({
            field:err.param,
            message:err.msg,
        }));

        return res.status(400).json({
            success:false,
            errors:formattedErrors,
        });
    }
    next();
};

module.exports={validateTask,validateTaskUpdate,validateTaskID,handleValidationErrors};
