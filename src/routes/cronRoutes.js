const express = require('express')
const routes = express.Router()
const {startCron, getAllDataCron,getCronById, updateName, updateTime, updateStatusCron} = require('../controllers/cronController')
const configJwt = require('../config/configJwt');
const { authorizeRole } = require('../config/configAuthRole');


/** POST Methods */
/**
 * @openapi
 * '/api/v1/cron/start':
 *  post:
 *     tags:
 *     - Cron
 *     summary: Create a Cron and start Cron (Admin)
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
 *              - minute
 *              - hour
 *              - dayOfMonth
 *              - month
 *              - dayOfWeek
 *              - enable
 *            properties:
 *              name:
 *                type: string
 *              minute:
 *                type: string
 *              hour:
 *                type: string
 *              dayOfMonth:
 *                type: string
 *              month:
 *                type: string
 *              dayOfWeek:
 *                type: string
 *              enable:
 *                type: boolean
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.post("/start", configJwt.checkTokenVerify, authorizeRole('admin'), startCron)

/** GET Methods */
/**
 * @openapi
 * '/api/v1/cron/':
 *  get:
 *     tags:
 *     - Cron
 *     summary: Get All Data Cron (Admin)
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
routes.get("/", configJwt.checkTokenVerify, authorizeRole('admin'), getAllDataCron)

/** GET Methods */
/**
 * @openapi
 * '/api/v1/cron/department/:_id':
 *  get:
 *     tags:
 *     - Cron
 *     summary: Get One Cron (Admin)
 *     parameters:
 *      - name: id cron
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
routes.get("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), getCronById)

/** PUT Methods */
/**
 * @openapi
 * '/api/v1/cron/:_id/name':
 *  put:
 *     tags:
 *     - Cron
 *     summary: Update a Cron name (Admin)
 *     security:
 *     - BearerAuth: []
 *     parameters:
 *      - name: id cron
 *        in: path
 *        required: true
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
 *     responses:
 *      200:
 *        description: Updated
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.put("/:_id/name", configJwt.checkTokenVerify, authorizeRole('admin'), updateName)

/** PUT Methods */
/**
 * @openapi
 * '/api/v1/cron/:_id/time':
 *  put:
 *     tags:
 *     - Cron
 *     summary: Update a Cron time (Admin)
 *     security:
 *     - BearerAuth: []
 *     parameters:
 *      - name: id cron
 *        in: path
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - minute
 *              - hour
 *              - dayOfMonth
 *              - month
 *              - dayOfWeek
 *            properties:
 *              minute:
 *                type: string
 *              hour:
 *                type: string
 *              dayOfMonth:
 *                type: string
 *              month:
 *                type: string
 *              dayOfWeek:
 *                type: string
 *     responses:
 *      200:
 *        description: Updated
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.put("/:_id/time", configJwt.checkTokenVerify, authorizeRole('admin'), updateTime)

/** PUT Methods */
/**
 * @openapi
 * '/api/v1/cron/:_id/enable':
 *  put:
 *     tags:
 *     - Cron
 *     summary: Update a Cron enable (Admin)
 *     security:
 *     - BearerAuth: []
 *     parameters:
 *      - name: id cron
 *        in: path
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - enable
 *            properties:
 *              enable:
 *                type: boolean
 *     responses:
 *      200:
 *        description: Updated
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.put("/:_id/enable", configJwt.checkTokenVerify, authorizeRole('admin'), updateStatusCron)

module.exports = routes