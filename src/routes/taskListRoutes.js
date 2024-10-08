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
    updateStatusTaskList,
    getTaskListWithStatus,
    getTaskListWithDueDate,
    updateDateTaskList} = require('../controllers/taskListController')
const asyncHandle = require('../middleware/asyncHandle')



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
routes.post("/create", configJwt.checkTokenVerify, authorizeRole('admin'), asyncHandle(createOneTaskList))

/** GET Methods */
/**
 * @openapi
 * '/api/v1/taskList/filter?':
 *  get:
 *     tags:
 *     - Task List
 *     summary: Get All Task List By Status (Admin, User)
 *     parameters:
 *      - name: status
 *        in: query
 *        required: true
 *        schema:
 *          type: string
 *          enum: [Pending, In Process, Completed]
 *        description: Filter task list by status
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
routes.get("/filter", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), asyncHandle(getTaskListWithStatus))

/** GET Methods */
/**
 * @openapi
 * '/api/v1/taskList/duedate/filter?':
 *  get:
 *     tags:
 *     - Task List
 *     summary: Get All Task List By DueDate (Admin, User)
 *     parameters:
 *      - name: duedate
 *        in: query
 *        required: true
 *        schema:
 *          type: string
 *          enum: [overduedate, tomorow, nextweek, nextmonth, no duedate]
 *        description: Filter task list by duedate
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
routes.get("/duedate/filter", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), asyncHandle(getTaskListWithDueDate))

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
routes.get("/boardList/", configJwt.checkTokenVerify, authorizeRole('admin','user'), asyncHandle(getAllTaskListWithBoardList))

/** GET Methods */
/**
 * @openapi
 * '/api/v1/taskList/boardList/:_id':
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
routes.get("/boardList/:boardList_id", configJwt.checkTokenVerify, authorizeRole('admin','user'), asyncHandle(getAllTaskListWithBoardListParam))

/** GET Methods */
/**
 * @openapi
 * '/api/v1/taskList/:_id':
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
routes.get("/:_id", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), asyncHandle(getOneTaskList))

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
routes.get("/", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), asyncHandle(getAllTaskList))

/** PUT Methods */
/**
 * @openapi
 * '/api/v1/taskList/:_id':
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
routes.put("/:_id", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), asyncHandle(updateOneTaskList))

/** PUT Methods */
/**
 * @openapi
 * '/api/v1/taskList/status/:_id':
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
routes.put("/status/:_id", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), asyncHandle(updateStatusTaskList))

/** PUT Methods */
/**
 * @openapi
 * '/api/v1/taskList/date/:_id':
 *  put:
 *     tags:
 *     - Task List
 *     summary: Update a date Task List (Admin)
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
 *              - startdate
 *              - duedate
 *            properties:
 *              startdate:
 *                type: string
 *              duedate:
 *                type: string
 *     responses:
 *      201:
 *        description: Updated
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.put("/date/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), asyncHandle(updateDateTaskList))

/** DELETE Methods */
/**
 * @openapi
 * '/api/v1/taskList/:_id':
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
routes.delete("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), asyncHandle(deleteTaskList))

module.exports = routes;