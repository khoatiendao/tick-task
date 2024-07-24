const express = require('express')
const routes = express.Router()
const configJwt = require('../config/configJwt');
const { authorizeRole } = require('../config/configAuthRole');
const {
    createOneMember, 
    getOneMember, 
    getAllMember, 
    updateOneMember, 
    deleteOneMember, 
    getAllMemberWithUserAndPositionAndDepartment, 
    getIdMemberWithUserAndPositionAndDepartment,
    getAllMemberWithEmailAndNamePositionAndDepartment,
    getIdMemberWithEmailAndNamePositionAndDepartment
} = require('../controllers/memberController')

/** POST Methods */
/**
 * @openapi
 * '/api/v1/member/createMember':
 *  post:
 *     tags:
 *     - Member
 *     summary: Create a Member (Admin)
 *     security:
 *     - BearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - position_id
 *              - department_id
 *            properties:
 *              email:
 *                type: string
 *                default: khoatiendao@gmail.com
 *              position_id:
 *                type: string
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
routes.post("/createMember", configJwt.checkTokenVerify, authorizeRole('admin'), createOneMember)

/** GET Methods */
/**
 * @openapi
 * '/api/v1/member/user/position/department':
 *  get:
 *     tags:
 *     - Member
 *     summary: Get All Member with all information User and Position and Department (Admin, User)
 *     security:
 *     - BearerAuth: []
 *     responses:
 *      200:
 *        description: Get All Member Successfull
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.get("/user/position/department", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), getAllMemberWithUserAndPositionAndDepartment)

/** GET Methods */
/**
 * @openapi
 * '/api/v1/member/user/position/department/{:_id}':
 *  get:
 *     tags:
 *     - Member
 *     summary: Get One Member with all information User and Position and Department (Admin, User)
 *     parameters:
 *      - name: id member
 *        in: path
 *        required: true
 *     security:
 *     - BearerAuth: []
 *     responses:
 *      200:
 *        description: Get One member Successfull
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.get("/user/position/department/:_id", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), getIdMemberWithUserAndPositionAndDepartment)

/** GET Methods */
/**
 * @openapi
 * '/api/v1/member/email/name':
 *  get:
 *     tags:
 *     - Member
 *     summary: Get All Member with information User email and Name Position and Name Department (Admin, User)
 *     security:
 *     - BearerAuth: []
 *     responses:
 *      200:
 *        description: Get All Member Successfull
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.get("/email/name", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), getAllMemberWithEmailAndNamePositionAndDepartment)

/** GET Methods */
/**
 * @openapi
 * '/api/v1/member/user/email/name/{:_id}':
 *  get:
 *     tags:
 *     - Member
 *     summary: Get One Member with information User email and Name Position and Name Department (Admin, User)
 *     parameters:
 *      - name: id member
 *        in: path
 *        required: true
 *     security:
 *     - BearerAuth: []
 *     responses:
 *      200:
 *        description: Get One member Successfull
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.get("/email/name/:_id", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), getIdMemberWithEmailAndNamePositionAndDepartment)

/** GET Methods */
/**
 * @openapi
 * '/api/v1/member/{:_id}':
 *  get:
 *     tags:
 *     - Member
 *     summary: Get One Member (Admin, User)
 *     parameters:
 *      - name: id member
 *        in: path
 *        required: true
 *     security:
 *     - BearerAuth: []
 *     responses:
 *      200:
 *        description: Get One member Successfull
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.get("/:_id", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), getOneMember)

/** GET Methods */
/**
 * @openapi
 * '/api/v1/member/':
 *  get:
 *     tags:
 *     - Member
 *     summary: Get All Member (Admin, User)
 *     security:
 *     - BearerAuth: []
 *     responses:
 *      200:
 *        description: Get All Member Successfull
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.get("/", configJwt.checkTokenVerify, authorizeRole('admin', 'user'), getAllMember)

/** PUT Methods */
/**
 * @openapi
 * '/api/v1/member/{:_id}':
 *  put:
 *     tags:
 *     - Member
 *     summary: Update a Member (Admin)
 *     parameters:
 *      - name: id member
 *        in: path
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - position_id
 *              - department_id
 *            properties:
 *              email:
 *                type: string
 *                default: khoatiendao@gmail.com
 *              position_id:
 *                type: string
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
routes.put("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), updateOneMember)

/** DELETE Methods */
/**
 * @openapi
 * '/api/v1/member/{:_id}':
 *  delete:
 *     tags:
 *     - Member
 *     summary: Delete One Member (Admin)
 *     parameters:
 *      - name: id member
 *        in: path
 *        required: true
 *     security:
 *     - BearerAuth: []
 *     responses:
 *      200:
 *        description: Delete One Member Successfull
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.delete("/:_id", configJwt.checkTokenVerify, authorizeRole('admin'), deleteOneMember)

module.exports = routes