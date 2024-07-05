const express = require('express')
const routes = express.Router()
const {createOneDepartment, getAllDepartment, getOneDepartment, deleteOneDepartment} = require('../controllers/departmentController')
const configJwt = require('../config/configJwt');
const { authorizeRole } = require('../config/configAuthRole');


/** POST Methods */
    /**
     * @openapi
     * '/api/v1/department/createDepartment':
     *  post:
     *     tags:
     *     - Department
     *     summary: Create a department
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - name
     *            properties:
     *              name:
     *                type: string
     *                default: Accounting Department 
     *     responses:
     *      201:
     *        description: Created
     *      400:
     *        description: Bad Request
     *      500:
     *        description: Server Error
     */
routes.post("/createDepartment", configJwt.checkTokenVerify, authorizeRole('admin'), createOneDepartment)

/** GET Methods */
    /**
     * @openapi
     * '/api/v1/department/':
     *  get:
     *     tags:
     *     - Department
     *     summary: Get All Department
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
routes.get("/", configJwt.checkTokenVerify, authorizeRole('admin'), getAllDepartment)
routes.get("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), getOneDepartment)
routes.delete("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), deleteOneDepartment)

module.exports = routes