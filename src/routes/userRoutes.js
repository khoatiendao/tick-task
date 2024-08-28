const express = require('express');
const routes = express.Router();
const {
  registerUser,
  emailVerifyUser,
  loginUser,
  checkToken,
  getAllUser, 
  getIdUser, 
  updateProfileUser, 
  updateRoleForUser
} = require('../controllers/userController');
const configJwt = require('../config/configJwt');
const { authorizeRole } = require('../config/configAuthRole');
const asyncHandle = require('../middleware/asyncHandle')

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
routes.post('/register', registerUser);

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
 *        content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please type email and password"
 *      500:
 *        description: Server Error
 */
routes.post('/login', asyncHandle(loginUser));

/** GET Methods */
/**
 * @openapi
 * '/api/v1/user/':
 *  get:
 *     tags:
 *     - Users
 *     summary: Get All User (Admin, SuperAdmin)
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
routes.get("/", configJwt.checkTokenVerify, authorizeRole('admin', 'SuperAdmin'), getAllUser)

/** GET Methods */
/**
 * @openapi
 * '/api/v1/user/:_id':
 *  get:
 *     tags:
 *     - Users
 *     summary: Get One User (Admin, User, SuperAdmin)
 *     parameters:
 *      - name: id user
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
routes.get("/:_id", configJwt.checkTokenVerify, authorizeRole('admin', 'user', 'SuperAdmin'), getIdUser)

/** PUT Methods */
/**
 * @openapi
 * '/api/v1/user/:_id':
 *  put:
 *     tags:
 *     - Users
 *     summary: Update Profile User (Admin, User, SuperAdmin)
 *     parameters:
 *     - name: id user
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
 *              - name
 *              - gender
 *              - phone
 *              - address
 *            properties:
 *              name:
 *                type: string
 *              gender:
 *                type: string
 *              phone:
 *                type: number
 *              address:
 *                type: string
 *     responses:
 *      201:
 *        description: Updated
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.put("/:_id", configJwt.checkTokenVerify, authorizeRole('admin', 'user', 'SuperAdmin'), updateProfileUser)

/** PUT Methods */
/**
 * @openapi
 * '/api/v1/user/role/:_id':
 *  put:
 *     tags:
 *     - Users
 *     summary: Update Profile User (SuperAdmin)
 *     parameters:
 *     - name: id user
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
 *              - role
 *            properties:
 *              role:
 *                type: string
 *     responses:
 *      201:
 *        description: Updated
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.put("/role/:_id", configJwt.checkTokenVerify, authorizeRole('SuperAdmin'), updateRoleForUser)

/** GET Methods */
/**
 * @openapi
 * '/api/v1/user/confirmation/:tokenEmail':
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
routes.post(
  '/confirmation/:tokenEmail',
  configJwt.checkTokenMailVerify,
  emailVerifyUser
);

/** GET Methods */
/**
 * @openapi
 * '/api/v1/user/token':
 *  get:
 *     tags:
 *     - Users Authorization
 *     summary: Check token valid (Admin, User, SuperAdmin)
 *     security:
 *     - BearerAuth: []
 *     responses:
 *      200:
 *        description: Token is valid
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
routes.get(
  '/token',
  configJwt.checkTokenVerify,
  authorizeRole('admin', 'user', 'SuperAdmin'),
  checkToken
);

module.exports = routes;
