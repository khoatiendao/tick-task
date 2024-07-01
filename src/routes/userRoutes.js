const express = require('express');
const routes = express.Router();
const {registerUser, emailVerifyUser, loginUser, checkToken} = require('../controllers/userController')
const configJwt = require('../config/configJwt');
const { authorizeRole } = require('../config/configAuthRole');

routes.post("/createUser", registerUser)
routes.post("/loginUser", loginUser)
routes.get("/confirmation/:tokenEmail", configJwt.checkTokenMailVerify , emailVerifyUser);
routes.get("/token", configJwt.checkTokenVerify, authorizeRole('admin', 'user') , checkToken)

module.exports = routes;