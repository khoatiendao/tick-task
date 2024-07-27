const express = require('express')
const routes = express.Router()
const {createOnePosition, getOnePosition, getAllPosition, updateOnePosition, deleteOnePosition} = require('../controllers/positionController')
const configJwt = require('../config/configJwt')
const { authorizeRole } = require('../config/configAuthRole');


/** POST Methods */
/**
 * @openapi
 * '/api/v1/position/createPosition':
 *  post:
 *     tags:
 *     - Position
 *     summary: Create a Position (Admin)
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
 *                default: Back End
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.post("/createPosition", configJwt.checkTokenVerify, authorizeRole('admin'), createOnePosition)

/** GET Methods */
/**
 * @openapi
 * '/api/v1/position/:_id':
 *  get:
 *     tags:
 *     - Position
 *     summary: Get One Position (Admin)
 *     parameters:
 *      - name: id position
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
routes.get("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), getOnePosition)

/** GET Methods */
/**
 * @openapi
 * '/api/v1/position/':
 *  get:
 *     tags:
 *     - Position
 *     summary: Get All Position (Admin)
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
routes.get("/", configJwt.checkTokenVerify, authorizeRole('admin'), getAllPosition)

/** PUT Methods */
/**
 * @openapi
 * '/api/v1/position/:_id':
 *  put:
 *     tags:
 *     - Position
 *     summary: Update a Position (Admin)
 *     parameters:
 *      - name: id position
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
 *              - name
 *            properties:
 *              name:
 *                type: string
 *                default: Back End
 *     responses:
 *      201:
 *        description: Updated
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.put("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), updateOnePosition)

/** DELETE Methods */
/**
 * @openapi
 * '/api/v1/position/:_id':
 *  delete:
 *     tags:
 *     - Position
 *     summary: Delete One Position (Admin)
 *     parameters:
 *      - name: id position
 *        in: path
 *        required: true
 *     security:
 *     - BearerAuth: []
 *     responses:
 *      200:
 *        description: Delete One Position Successfull
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.delete("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), deleteOnePosition)


module.exports = routes