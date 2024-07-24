const express = require('express')
const routes = express.Router()
const configJwt = require('../config/configJwt');
const { authorizeRole } = require('../config/configAuthRole');
const {
    createOneTaskList, 
    getOneTaskList, 
    getAllTaskList, 
    updateOneTaskList, 
    deleteTaskList, 
    getAllTaskListWithBoardList,
    getAllTaskListWithBoardListParam,
    updateStatusTaskList} = require('../controllers/taskListController')


/** POST Methods */
/**
 * @openapi
 * '/api/v1/taskList/create':
 *  post:
 *     tags:
 *     - Task List
 *     summary: Create a Task List (Admin)
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
 *              - description
 *              - status
 *              - priority
 *              - startdate
 *              - duedate
 *              - boardList
 *            properties:
 *              title:
 *                type: string
 *              description:
 *                type: string
 *              status:
 *                type: string
 *              priority:
 *                type: string
 *              startdate:
 *                type: string
 *              duedate:
 *                type: string
 *              boardList_id:
 *                type: string
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.post("/create", configJwt.checkTokenVerify, authorizeRole('admin'), createOneTaskList)

/** GET Methods */
/**
 * @openapi
 * '/api/v1/taskList/boardList':
 *  get:
 *     tags:
 *     - Task List
 *     summary: Get All Task List with all infomation Board List (Admin, User)
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
routes.get("/boardList/", configJwt.checkTokenVerify, authorizeRole('admin','user'), getAllTaskListWithBoardList)

/** GET Methods */
/**
 * @openapi
 * '/api/v1/taskList/boardList/{:_id}':
 *  get:
 *     tags:
 *     - Task List
 *     summary: Get One Task List with all information board List (Admin, User)
 *     parameters:
 *      - name: id board list
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
routes.get("/boardList/:boardList_id", configJwt.checkTokenVerify, authorizeRole('admin','user'), getAllTaskListWithBoardListParam)

/** GET Methods */
/**
 * @openapi
 * '/api/v1/taskList/{:_id}':
 *  get:
 *     tags:
 *     - Task List
 *     summary: Get One Task List (Admin, User)
 *     parameters:
 *      - name: id task list
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
routes.get("/:_id", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), getOneTaskList)

/** GET Methods */
/**
 * @openapi
 * '/api/v1/taskList/':
 *  get:
 *     tags:
 *     - Task List
 *     summary: Get All Task List (Admin, User)
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
routes.get("/", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), getAllTaskList)

/** PUT Methods */
/**
 * @openapi
 * '/api/v1/taskList/{:_id}':
 *  put:
 *     tags:
 *     - Task List
 *     summary: Update a Task List (Admin, User)
 *     parameters:
 *     - name: id task list
 *       in: path
 *       required: true
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
 *              - description
 *              - status
 *              - priority
 *              - startdate
 *              - duedate
 *              - boardList
 *            properties:
 *              title:
 *                type: string
 *              description:
 *                type: string
 *              status:
 *                type: string
 *              priority:
 *                type: string
 *              startdate:
 *                type: string
 *              duedate:
 *                type: string
 *              boardList_id:
 *                type: string
 *     responses:
 *      201:
 *        description: Updated
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.put("/:_id", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), updateOneTaskList)

/** PUT Methods */
/**
 * @openapi
 * '/api/v1/taskList/status/{:_id}':
 *  put:
 *     tags:
 *     - Task List
 *     summary: Update a Status Task List (Admin, User)
 *     parameters:
 *     - name: id task list
 *       in: path
 *       required: true
 *     security:
 *     - BearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - status
 *            properties:
 *              status:
 *                type: string
 *     responses:
 *      201:
 *        description: Updated
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.put("/status/:_id", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), updateStatusTaskList)

/** DELETE Methods */
/**
 * @openapi
 * '/api/v1/taskList/{:_id}':
 *  delete:
 *     tags:
 *     - Task List
 *     summary: Delete One Task List (Admin)
 *     parameters:
 *      - name: id task list
 *        in: path
 *        required: true
 *     security:
 *     - BearerAuth: []
 *     responses:
 *      200:
 *        description: Delete One Task List Successfull
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.delete("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), deleteTaskList)

module.exports = routes;