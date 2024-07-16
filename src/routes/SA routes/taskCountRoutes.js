const express = require('express')
const routes = express.Router()
const configJwt = require('../../config/configJwt');
const { authorizeRole } = require('../../config/configAuthRole');
const {countStatusPending, countStatusInProcess, countStatusCompleted, countTaskSum} = require('../../controllers/SA controllers/countTaskController')

routes.get("/", configJwt.checkTokenVerify, authorizeRole('SuperAdmin'), countTaskSum)

routes.get("/pending", configJwt.checkTokenVerify, authorizeRole('SuperAdmin'), countStatusPending)

routes.get("/inprocess", configJwt.checkTokenVerify, authorizeRole('SuperAdmin'), countStatusInProcess)

routes.get("/completed", configJwt.checkTokenVerify, authorizeRole('SuperAdmin'), countStatusCompleted)


module.exports = routes;