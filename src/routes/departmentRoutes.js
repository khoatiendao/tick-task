const express = require('express')
const routes = express.Router()
const {createOneDepartment, getAllDepartment, getOneDepartment, deleteOneDepartment} = require('../controllers/departmentController')
const configJwt = require('../config/configJwt');
const { authorizeRole } = require('../config/configAuthRole');

routes.post("/createDepartment", configJwt.checkTokenVerify, authorizeRole('admin'), createOneDepartment)
routes.get("/", configJwt.checkTokenVerify, authorizeRole('admin'), getAllDepartment)
routes.get("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), getOneDepartment)
routes.delete("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), deleteOneDepartment)

module.exports = routes