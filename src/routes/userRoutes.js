const express = require('express');
const routes = express.Router();
const {registerUser, emailVerifyUser, loginUser, checkToken} = require('../controllers/userController')
const configJwt = require('../config/configJwt');
const { authorizeRole } = require('../config/configAuthRole');



/** POST Methods */
    /**
     * @openapi
     * '/api/v1/user/register':
     *  post:
     *     tags:
     *     - Users
     *     summary: Create a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - name
     *              - email
     *              - password
     *              - gender
     *              - phone
     *              - address
     *              - active
     *              - role
     *            properties:
     *              name:
     *                type: string
     *                default: khoatiendao 
     *              email:
     *                type: string
     *                default: khoatiendao@mail.com
     *              password:
     *                type: string
     *                default: Khoa147@
     *              gender:
     *                type: string
     *                default: Male
     *              phone:
     *                type: number
     *                default: 0912312837
     *              address:
     *                type: string
     *                default: Phan Văn Hân
     *              active:
     *                type: number
     *                default: 0
     *              role:
     *                type: string
     *                default: user
     *     responses:
     *      201:
     *        description: Created
     *      400:
     *        description: Bad Request
     *      500:
     *        description: Server Error
     */
routes.post("/register", registerUser)

/** POST Methods */
    /**
     * @openapi
     * '/api/v1/user/login':
     *  post:
     *     tags:
     *     - Users
     *     summary: Login user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            properties:
     *              email:
     *                type: string
     *                default: khoatiendao@gmail.com
     *              password:
     *                type: string
     *                default: Khoa123@
     *     responses:
     *      200:
     *        description: Login User
     *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
     *      400:
     *        description: Bad Request
     *      500:
     *        description: Server Error
     */
routes.post("/login", loginUser)

/** GET Methods */
    /**
     * @openapi
     * '/api/v1/user/confirmation/{tokenEmail}':
     *  get:
     *     tags:
     *     - Users
     *     summary: Get token email by send user mail
     *     parameters:
     *      - name: tokenEmail
     *        in: path
     *        description: token is sending into email user
     *        required: true
     *     responses:
     *      200:
     *        description: Confirmation Successfully
     *      400:
     *        description: Bad Request
     *      500:
     *        description: Server Error
     */
routes.get("/confirmation/:tokenEmail", configJwt.checkTokenMailVerify, emailVerifyUser);

/** GET Methods */
    /**
     * @openapi
     * '/api/v1/user/token':
     *  get:
     *     tags:
     *     - Users Authorization
     *     summary: Check token valid
     *     security:
     *     - ApiKeyAuth: []
     *     responses:
     *      200:
     *        description: Token is valid
     *      400:
     *        description: Bad Request
     *      500:
     *        description: Server Error
     */
routes.get("/token", configJwt.checkTokenVerify, authorizeRole('admin', 'user') , checkToken)

module.exports = routes;