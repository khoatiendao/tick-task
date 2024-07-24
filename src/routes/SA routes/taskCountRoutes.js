const express = require('express')
const routes = express.Router()
const configJwt = require('../../config/configJwt');
const { authorizeRole } = require('../../config/configAuthRole');
const {countStatusPending, countStatusInProcess, countStatusCompleted, countTaskSum} = require('../../controllers/SA controllers/countTaskController')


/** GET Methods */
/**
 * @openapi
 * '/api/v1/admin/dashboard/task':
 *  get:
 *     tags:
 *     - Super Admin
 *     summary: Count All task For Dashboard (SuperAdmin)
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
routes.get("/", configJwt.checkTokenVerify, authorizeRole('SuperAdmin'), countTaskSum)

/** GET Methods */
/**
 * @openapi
 * '/api/v1/admin/dashboard/task/pending':
 *  get:
 *     tags:
 *     - Super Admin
 *     summary: Count All task with status Pending For Dashboard (SuperAdmin)
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
routes.get("/pending", configJwt.checkTokenVerify, authorizeRole('SuperAdmin'), countStatusPending)

/** GET Methods */
/**
 * @openapi
 * '/api/v1/admin/dashboard/task/ỉnprocess':
 *  get:
 *     tags:
 *     - Super Admin
 *     summary: Count All task with status In Process For Dashboard (SuperAdmin)
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
routes.get("/inprocess", configJwt.checkTokenVerify, authorizeRole('SuperAdmin'), countStatusInProcess)

/** GET Methods */
/**
 * @openapi
 * '/api/v1/admin/dashboard/task/completed':
 *  get:
 *     tags:
 *     - Super Admin
 *     summary: Count All task with status Completed For Dashboard (SuperAdmin)
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
routes.get("/completed", configJwt.checkTokenVerify, authorizeRole('SuperAdmin'), countStatusCompleted)


module.exports = routes;