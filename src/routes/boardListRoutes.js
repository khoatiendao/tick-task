const express = require('express')
const routes = express.Router()
const configJwt = require('../config/configJwt');
const { authorizeRole } = require('../config/configAuthRole');
const {createOneBoardList, getOneBoardList, getAllBoardList, updateOneBoardList, deleteOneBoardList} = require('../controllers/boardListController')

routes.post("/create", configJwt.checkTokenVerify, authorizeRole('admin'), createOneBoardList)
routes.get("/:_id", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), getOneBoardList)
routes.get("/", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), getAllBoardList)
routes.put("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), updateOneBoardList)
routes.delete("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), deleteOneBoardList)

module.exports = routes