const mongoose=require('mongoose');

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    due_date:{
        type:Date,
        required:true,
        validate:{
            validator:function(value){
                return value > this.created_at;
            },
            message:'Due date must be after the creation of date'
        }
    },
    status:{
        type:String,
        enum:['pending','in_progress','completed'],
        default:'pending'
    },
    created_at:{
        type:Date,
        default:Date.now,
    },
    updated_at:{
        type:Date,
        default:Date.now,
    }
    
});

//pre hook to upade upadate_at before updating document
taskSchema.pre('save',function(next){
    this.updated_at=Date.now();
    next();

})

//pre hook to update update_at before findOneAndUpdate
taskSchema.pre('findOneAndUpdate',
    function(next){
        this.set({updated_at:Date.now()})
        next();
    })

taskSchema.index({ title: 1 });
taskSchema.index({ status: 1 });
taskSchema.index({ due_date: 1 });

const Task=mongoose.model('Task',taskSchema);
module.exports=Task;