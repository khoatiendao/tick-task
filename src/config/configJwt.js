const jwt = require('jsonwebtoken')
require('dotenv').config()
const jwtKey = process.env.SECRET_KEY
const Model = require('../models/userModel')

const JwToken = {
    generatedToken(_id, role) {
        const createToken = jwt.sign(
        {
            _id: _id,
            role: role
        }, jwtKey, {algorithm: "HS256", expiresIn: process.env.EXPIRES_IN});
        return createToken;
    },

    
    checkTokenVerify(req, res, next) {
        const tokenVerify = req.headers['auth-token-bearer']
        if(tokenVerify) {
            jwt.verify(tokenVerify, jwtKey, {algorithms: ['HS256']}, (err, decoded) => {
                if(err) {
                    return res.json({success: false, message: 'Something wrong about verify token'})
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
        } else {
            return res.json({success: false, message: 'Somthing wrong about headers'})
        }
    },

    generatedTokenMail(email) {
        const createTokenMail = jwt.sign({
            email: email
        }, jwtKey, {algorithm: "HS256" ,expiresIn: process.env.EXPIRES_MAIL_IN});
        return createTokenMail;
    },

    checkTokenMailVerify(req, res, next) {
        const tokenEmail = req.params.tokenEmail
        if(tokenEmail) {
            jwt.verify(tokenEmail, jwtKey, {algorithms: ['HS256']}, (err, decoded) => {
                if(err) {
                    console.log(err)
                    return res.status(400).json({success: false, message: 'Something wrong about verify token mail'})
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(400).json({success: false, message: 'Something wrong about token'})
        }
    }
};

module.exports = JwToken;