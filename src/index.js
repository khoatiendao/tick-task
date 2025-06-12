const express = require('express')
const app = express();
const bodyParser = require('body-parser')
require('dotenv').config()
const PORT = process.env.PORT || 9443;
const mongooseConnected = require('./config/configDatabase');
const boardRoutes = require('./routes/boardRoutes')
const departmentRoutes = require('./routes/departmentRoutes');
const userRoutes = require('./routes/userRoutes');
const positionRoutes = require('./routes/positionRoutes')
const memberRoutes = require('./routes/memberRoutes')
const boardListRoutes = require('./routes/boardListRoutes')
const taskListRoutes = require('./routes/taskListRoutes')
const taskAssignmentRoutes = require('./routes/taskAssignmentRoutes')
const {swaggerUI, specsDoc} = require('./utils/doc/apiDoc')
const userCountRoutes = require('./routes/SA routes/userCountRoutes')
const taskCountRoutes = require('./routes/SA routes/taskCountRoutes')
const cronRoutes = require('./routes/cronRoutes');
const errorHandle = require('./middleware/errorHandle');
const logger = require('./middleware/logHandle');
// const socketIo = require('socket.io')


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, OPTIONS, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,auth-token-bearer");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("optionsSucessStatus", 200)
    next()
});

app.use(logger)
// Api document
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specsDoc));

// Api routes
app.use("/api/v1/department", departmentRoutes)
app.use("/api/v1/board", boardRoutes)
app.use("/api/v1/boardList", boardListRoutes)
app.use("/api/v1/taskList", taskListRoutes)
app.use("/api/v1/taskAssignment", taskAssignmentRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/position", positionRoutes)
app.use("/api/v1/member", memberRoutes)

// routes Super Admin
app.use("/api/v1/admin/dashboard/user", userCountRoutes)
app.use("/api/v1/admin/dashboard/task", taskCountRoutes)

// cron bot routes
app.use("/api/v1/cron", cronRoutes)

app.use(errorHandle)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

app.get("/", (req, res) => {
    res.send("Welcome to my To-do App")
})

// Use Socket
// const io = socketIo(io)
// io.on('connection', (socket) => {
//     console.log('New Client connected');
// })