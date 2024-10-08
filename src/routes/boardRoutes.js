const express = require('express');
const routes = express.Router();
const {
  postBoard,
  getBoardById,
  getAllBoard,
  deleteBoardById,
  updateBoardById,
  getAllBoardWithDepartment,
  getBoardByIdWithDepartment,
} = require('../controllers/boardController');
const configJwt = require('../config/configJwt');
const { authorizeRole } = require('../config/configAuthRole');
const asyncHandle = require('../middleware/asyncHandle')

/** POST Methods */
/**
 * @openapi
 * '/api/v1/board/createBoard':
 *  post:
 *     tags:
 *     - Board
 *     summary: Create a Board (Admin)
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
 *              - department_id
 *            properties:
 *              title:
 *                type: string
 *                default: Accounting Department
 *              department_id:
 *                type: string
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.post('/createBoard', configJwt.checkTokenVerify, authorizeRole('admin'), asyncHandle(postBoard));

/** GET Methods */
/**
 * @openapi
 * '/api/v1/board/department':
 *  get:
 *     tags:
 *     - Board
 *     summary: Get All Board with all information Department (Admin, User)
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
routes.get('/department', configJwt.checkTokenVerify, authorizeRole('admin', 'user'), asyncHandle(getAllBoardWithDepartment));

/** GET Methods */
/**
 * @openapi
 * '/api/v1/board/department/:_id':
 *  get:
 *     tags:
 *     - Board
 *     summary: Get One Board with all information Department (Admin, User)
 *     parameters:
 *      - name: id board
 *        in: path
 *        required: true
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
routes.get("/department/:_id", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), asyncHandle(getBoardByIdWithDepartment))

/** GET Methods */
/**
 * @openapi
 * '/api/v1/board/:_id':
 *  get:
 *     tags:
 *     - Board
 *     summary: Get One Board (Admin, User)
 *     parameters:
 *      - name: id board
 *        in: path
 *        required: true
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
routes.get('/:_id', configJwt.checkTokenVerify, authorizeRole('admin', 'user'), asyncHandle(getBoardById));

/** GET Methods */
/**
 * @openapi
 * '/api/v1/board/':
 *  get:
 *     tags:
 *     - Board
 *     summary: Get All Board (Admin, User)
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
routes.get('/', configJwt.checkTokenVerify, authorizeRole('admin', 'user'), asyncHandle(getAllBoard));

/** PUT Methods */
/**
 * @openapi
 * '/api/v1/board/:_id':
 *  put:
 *     tags:
 *     - Board
 *     summary: Update a Board (Admin)
 *     security:
 *     - BearerAuth: []
 *     parameters:
 *      - name: id board
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
 *              - department_id
 *            properties:
 *              title:
 *                type: string
 *                default: Accounting Department
 *              department_id:
 *                type: string
 *     responses:
 *      200:
 *        description: Updated
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.put('/:_id', configJwt.checkTokenVerify, authorizeRole('admin'), asyncHandle(updateBoardById));

/** DELETE Methods */
/**
 * @openapi
 * '/api/v1/board/:_id':
 *  delete:
 *     tags:
 *     - Board
 *     summary: Delete One Board (Admin)
 *     parameters:
 *      - name: id Board
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
routes.delete('/:_id', configJwt.checkTokenVerify, authorizeRole('admin'), asyncHandle(deleteBoardById));

module.exports = routes;
