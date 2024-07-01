const express = require('express')
const routes = express.Router()
const {postBoard, getBoardById, getAllBoard, deleteBoardById, updateBoardById} = require('../controllers/boardController')
const configJwt = require('../config/configJwt');
const { authorizeRole } = require('../config/configAuthRole');


routes.post("/createBoard", configJwt.checkTokenVerify, authorizeRole('admin'), postBoard)
routes.get("/:_id", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), getBoardById)
routes.get("/", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), getAllBoard)
routes.put("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), updateBoardById)
routes.delete("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), deleteBoardById)

module.exports = routes