const express = require('express')
const routes = express.Router()
const {startCron, getAllDataCron,getCronById, updateName, updateTime, updateStatusCron} = require('../controllers/cronController')
const configJwt = require('../config/configJwt');
const { authorizeRole } = require('../config/configAuthRole');

routes.post("/start", configJwt.checkTokenVerify, authorizeRole('admin'), startCron)

routes.get("/", configJwt.checkTokenVerify, authorizeRole('admin'), getAllDataCron)

routes.get("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), getCronById)

routes.put("/:_id/name", configJwt.checkTokenVerify, authorizeRole('admin'), updateName)

routes.put("/:_id/time", configJwt.checkTokenVerify, authorizeRole('admin'), updateTime)

routes.put("/:_id/enable", configJwt.checkTokenVerify, authorizeRole('admin'), updateStatusCron)

module.exports = routes