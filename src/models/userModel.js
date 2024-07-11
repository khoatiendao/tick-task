const mongoose = require('mongoose');
mongoose.set('strictPopulate', false)

const department = mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true,
    versionKey: false
})

const board = mongoose.Schema({
    _id: {
      type: String,
      required: true  
    },
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024
    },
    department: {
        type: String,
        ref: 'department'
    }
}, {
    timestamps: true,
    versionKey: false
})

const boardList = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024
    },
    board: {
        type: String,
        ref: 'board'
    }
}, {
    timestamps: true,
    versionKey: false  
})

const taskList = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['Pending', 'In Process', 'Completed'],
        default: 'Pending',
        required: true
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        required: true
    },
    startdate: Date,
    duedate: Date,
    boardList: {
        type: String,
        ref: 'boardList'
    }
},{
    timestamps: true,
    versionKey: false
})

const position = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
},{
    timestamps: true,
    versionKey: false
})

const members = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    user: {
        type: String,
        ref: 'user'
    },
    position: {
        type: String,
        ref: 'position'
    },
    department: {
        type: String,
        ref: 'department'
    }
}, {
    timestamps: true,
    versionKey: false
})

const taskAssignment = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    taskList: {
        type: String,
        ref: 'taskList'
    },
    member: {
        type: String,
        ref: 'member'
    }
}, {
    timestamps: true,
    versionKey: false
});

const user = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        minlength: 10,
        maxlength: 50,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 1,
        maxlength: 1024,
        required: true
    },
    gender: String,
    phone: Number,
    address: {
        type: String,
        minlength: 3,
        maxlength: 1024,
    },
    active: {
        type: Number,
        enum: [0, 1],
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'SuperAdmin'],
        default: 'user',
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

const departmentModel = mongoose.model('department', department)
const boardModel = mongoose.model('board', board)
const boardListModel = mongoose.model('boardList', boardList)
const taskListModel = mongoose.model('taskList', taskList)
const taskAssignmentModel = mongoose.model('taskAssignment', taskAssignment)
const userModel = mongoose.model('user', user);
const membersModel = mongoose.model('member', members)
const positionModel = mongoose.model('position', position)


module.exports = {userModel, boardModel, boardListModel, taskListModel, membersModel, taskAssignmentModel, positionModel, departmentModel};
