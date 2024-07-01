const express = require('express')
const routes = express.Router()
const configJwt = require('../config/configJwt');
const { authorizeRole } = require('../config/configAuthRole');
const {createOneMember, getOneMember, getAllMember, updateOneMember, deleteOneMember} = require('../controllers/memberController')

routes.post("/createMember", configJwt.checkTokenVerify, authorizeRole('admin'), createOneMember)
routes.get("/:_id", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), getOneMember)
routes.get("/", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), getAllMember)
routes.put("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), updateOneMember)
routes.delete("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), deleteOneMember)

module.exports = routes