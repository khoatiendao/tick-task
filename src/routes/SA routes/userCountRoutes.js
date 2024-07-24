const express = require('express')
const routes = express.Router()
const configJwt = require('../../config/configJwt');
const { authorizeRole } = require('../../config/configAuthRole');
const {countUserActive} = require('../../controllers/SA controllers/countUserController')


/** GET Methods */
/**
 * @openapi
 * '/api/v1/admin/dashboard/user':
 *  get:
 *     tags:
 *     - Super Admin
 *     summary: Count All User For Dashboard (SuperAdmin)
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
routes.get("/", configJwt.checkTokenVerify, authorizeRole('SuperAdmin'), countUserActive)

module.exports = routes