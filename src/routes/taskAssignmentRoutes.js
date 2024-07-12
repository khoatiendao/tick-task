const express = require('express')
const routes = express.Router()
const configJwt = require('../config/configJwt');
const { authorizeRole } = require('../config/configAuthRole');
const {
    createTaskAssignment, 
    getTaskAssignmentById, 
    getAllTaskAssignment, 
    updateTaskAssignment, 
    deleteTaskAssignment,
    findAllTaskListWithMemberId,
    deleteOneTaskListWithTaskAssignment} = require('../controllers/taskAssignmentController')

/** POST Methods */
/**
 * @openapi
 * '/api/v1/taskAssignment/create':
 *  post:
 *     tags:
 *     - Task Assignment
 *     summary: Create a Task Assignment
 *     security:
 *     - BearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - taskList_id
 *              - member_id
 *            properties:
 *              taskList_id:
 *                type: string
 *              member_id:
 *                type: string
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.post("/create", configJwt.checkTokenVerify, authorizeRole('admin'), createTaskAssignment)

routes.get("/member/:member_id", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), findAllTaskListWithMemberId)

/** GET Methods */
/**
 * @openapi
 * '/api/v1/taskAssignment/{:_id}':
 *  get:
 *     tags:
 *     - Task Assignment
 *     summary: Get One Task Assignment
 *     parameters:
 *      - name: id task assignment
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
routes.get("/:_id", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), getTaskAssignmentById)

/** GET Methods */
/**
 * @openapi
 * '/api/v1/taskAssignment/':
 *  get:
 *     tags:
 *     - Task Assignment
 *     summary: Get All Task Assignment
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
routes.get("/", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), getAllTaskAssignment)

/** PUT Methods */
/**
 * @openapi
 * '/api/v1/taskAssignment/{:_id}':
 *  put:
 *     tags:
 *     - Task Assignment
 *     summary: Update a Task Assignment
 *     parameters:
 *      - name: id task assignment
 *        in: path
 *        required: true
 *     security:
 *     - BearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - taskList_id
 *              - member_id
 *            properties:
 *              taskList_id:
 *                type: string
 *              member_id:
 *                type: string
 *     responses:
 *      201:
 *        description: Updated
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.put("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), updateTaskAssignment)

/** DELETE Methods */
/**
 * @openapi
 * '/api/v1/taskAssignment/{:_id}':
 *  delete:
 *     tags:
 *     - Task Assignment
 *     summary: Delete One Task Assignment
 *     parameters:
 *      - name: id task Assignment
 *        in: path
 *        required: true
 *     security:
 *     - BearerAuth: []
 *     responses:
 *      200:
 *        description: Delete One Task Assignment Successfull
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.delete("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), deleteTaskAssignment)

routes.delete("/delete-taskList/:member_id/:taskList_id", configJwt.checkTokenVerify, authorizeRole('admin'), deleteOneTaskListWithTaskAssignment)


module.exports = routes;