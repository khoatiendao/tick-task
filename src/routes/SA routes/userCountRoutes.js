const express = require('express')
const routes = express.Router()
const configJwt = require('../../config/configJwt');
const { authorizeRole } = require('../../config/configAuthRole');
const {countUserActive} = require('../../controllers/SA controllers/countUserController')

routes.get("/user", configJwt.checkTokenVerify, authorizeRole('SuperAdmin'), countUserActive)

module.exports = routes