const express = require('express')
const routes = express.Router()
const {createOnePosition, getOnePosition, getAllPosition, updateOnePosition, deleteOnePosition} = require('../controllers/positionController')
const configJwt = require('../config/configJwt')
const { authorizeRole } = require('../config/configAuthRole');

routes.post("/createPosition", configJwt.checkTokenVerify, authorizeRole('admin'), createOnePosition)
routes.get("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), getOnePosition)
routes.get("/", configJwt.checkTokenVerify, authorizeRole('admin'), getAllPosition)
routes.put("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), updateOnePosition)
routes.delete("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), deleteOnePosition)


module.exports = routes