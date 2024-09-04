const express = require('express');
const routes = express.Router();
const {
  createOneDepartment,
  getAllDepartment,
  getOneDepartment,
  deleteOneDepartment,
} = require('../controllers/departmentController');
const configJwt = require('../config/configJwt');
const { authorizeRole } = require('../config/configAuthRole');
const asyncHandle = require('../middleware/asyncHandle')

/** POST Methods */
/**
 * @openapi
 * '/api/v1/department/createDepartment':
 *  post:
 *     tags:
 *     - Department
 *     summary: Create a department (Admin)
 *     security:
 *     - BearerAuth: []
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
routes.post('/createDepartment', configJwt.checkTokenVerify, authorizeRole('admin'), asyncHandle(createOneDepartment));

/** GET Methods */
/**
 * @openapi
 * '/api/v1/department/':
 *  get:
 *     tags:
 *     - Department
 *     summary: Get All Department (Admin)
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
routes.get('/', configJwt.checkTokenVerify, authorizeRole('admin'), asyncHandle(getAllDepartment));

/** GET Methods */
/**
 * @openapi
 * '/api/v1/department/:_id':
 *  get:
 *     tags:
 *     - Department
 *     summary: Get One Department (Admin, User)
 *     parameters:
 *      - name: id department
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
routes.get('/:_id',configJwt.checkTokenVerify, authorizeRole('admin', 'user'), asyncHandle(getOneDepartment));

/** DELETE Methods */
/**
 * @openapi
 * '/api/v1/department/:_id':
 *  delete:
 *     tags:
 *     - Department
 *     summary: Delete One Department (Admin)
 *     parameters:
 *      - name: id department
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
routes.delete('/:_id', configJwt.checkTokenVerify, authorizeRole('admin'), asyncHandle(deleteOneDepartment));

module.exports = routes;
