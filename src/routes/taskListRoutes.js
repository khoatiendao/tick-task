const express = require('express')
const routes = express.Router()
const configJwt = require('../config/configJwt');
const { authorizeRole } = require('../config/configAuthRole');
const {createOneTaskList, getOneTaskList, getAllTaskList, updateOneTaskList, deleteTaskList} = require('../controllers/taskListController')

routes.post("/create", configJwt.checkTokenVerify, authorizeRole('admin'), createOneTaskList)
routes.get("/:_id", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), getOneTaskList)
routes.get("/", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), getAllTaskList)
routes.put("/:_id", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), updateOneTaskList)
routes.delete("/:_id", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), deleteTaskList)

module.exports = routes;