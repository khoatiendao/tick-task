const express = require('express')
const routes = express.Router()
const configJwt = require('../config/configJwt');
const { authorizeRole } = require('../config/configAuthRole');
const {createTaskAssignment, getTaskAssignmentById, getAllTaskAssignment, updateTaskAssignment, deleteTaskAssignment} = require('../controllers/taskAssignmentController')

routes.post("/create", configJwt.checkTokenVerify, authorizeRole('admin'), createTaskAssignment)
routes.get("/:_id", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), getTaskAssignmentById)
routes.get("/", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), getAllTaskAssignment)
routes.put("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), updateTaskAssignment)
routes.delete("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), deleteTaskAssignment)


module.exports = routes;