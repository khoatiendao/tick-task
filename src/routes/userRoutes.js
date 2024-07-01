const express = require('express');
const routes = express.Router();
const {registerUser, emailVerifyUser, loginUser, checkToken} = require('../controllers/userController')
const configJwt = require('../config/configJwt');
const { authorizeRole } = require('../config/configAuthRole');



/**
 * @swagger
 * 
 * /createUser:
 *   post:
 *     summary: Register a new user
 *     tags: 
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 */
routes.post("/createUser", registerUser)

/**
 * @swagger
 * /loginUser:
 *   post:
 *     summary: Login a user
 *     tags: 
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
routes.post("/loginUser", loginUser)

/**
 * @swagger
 * /confirmation/{tokenEmail}:
 *   get:
 *     summary: Verify user email
 *     tags: 
 *       - Users
 *     parameters:
 *       - name: tokenEmail
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 */
routes.get("/confirmation/:tokenEmail", configJwt.checkTokenMailVerify , emailVerifyUser);

/**
 * @swagger
 * /token:
 *   get:
 *     summary: Check token validity
 *     tags: 
 *       - Tokens
 *     responses:
 *       200:
 *         description: Token is valid
 */
routes.get("/token", configJwt.checkTokenVerify, authorizeRole('admin', 'user') , checkToken)

module.exports = routes;