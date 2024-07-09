const express = require('express')
const routes = express.Router()
const configJwt = require('../config/configJwt');
const { authorizeRole } = require('../config/configAuthRole');
const {createOneBoardList, getOneBoardList, getAllBoardList, updateOneBoardList, deleteOneBoardList, getAllBoardListWithBoardAndDepartment, getIdBoardListWithBoardAndDepartment} = require('../controllers/boardListController')


/** POST Methods */
/**
 * @openapi
 * '/api/v1/boardList/create':
 *  post:
 *     tags:
 *     - Board List
 *     summary: Create a Board List
 *     security:
 *     - BearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - board_id
 *            properties:
 *              title:
 *                type: string
 *                default: Front End
 *              board_id:
 *                type: string
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.post("/create", configJwt.checkTokenVerify, authorizeRole('admin'), createOneBoardList)

routes.get("/board/department", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), getAllBoardListWithBoardAndDepartment)

routes.get("/:_id/board/department", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), getIdBoardListWithBoardAndDepartment)

/** GET Methods */
/**
 * @openapi
 * '/api/v1/boardList/{:_id}':
 *  get:
 *     tags:
 *     - Board List
 *     summary: Get One Board List
 *     parameters:
 *      - name: id board List
 *        in: path
 *        required: true
 *     security:
 *     - BearerAuth: []
 *     responses:
 *      200:
 *        description: Get One Item Successfull
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.get("/:_id", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), getOneBoardList)

/** GET Methods */
/**
 * @openapi
 * '/api/v1/boardList/':
 *  get:
 *     tags:
 *     - Board List
 *     summary: Get All Board List
 *     security:
 *     - BearerAuth: []
 *     responses:
 *      200:
 *        description: Get All Item Successfull
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.get("/", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), getAllBoardList)

/** PUT Methods */
/**
 * @openapi
 * '/api/v1/boardList/{:_id}':
 *  put:
 *     tags:
 *     - Board List
 *     summary: Update a Board List
 *     parameters:
 *      - name: id board List
 *        in: path
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - board_id
 *            properties:
 *              title:
 *                type: string
 *                default: Front End
 *              board_id:
 *                type: string
 *     responses:
 *      200:
 *        description: Updated
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.put("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), updateOneBoardList)

/** DELETE Methods */
/**
 * @openapi
 * '/api/v1/boardList/{:_id}':
 *  delete:
 *     tags:
 *     - Board List
 *     summary: Delete One Board List
 *     parameters:
 *      - name: id Board List
 *        in: path
 *        required: true
 *     security:
 *     - BearerAuth: []
 *     responses:
 *      200:
 *        description: Delete One Item Successfull
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.delete("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), deleteOneBoardList)

module.exports = routes