const express = require('express')
const routes = express.Router()
const {startCron, getDataCron, updateTime, updateStatusCron} = require('../controllers/cronController')
const configJwt = require('../config/configJwt');
const { authorizeRole } = require('../config/configAuthRole');

routes.post("/start", configJwt.checkTokenVerify, authorizeRole('admin'), startCron)

routes.get("/", configJwt.checkTokenVerify, authorizeRole('admin'), getDataCron)

routes.put("/updateTime", configJwt.checkTokenVerify, authorizeRole('admin'), updateTime)

routes.put("/updateStatus", configJwt.checkTokenVerify, authorizeRole('admin'), updateStatusCron)

module.exports = routes