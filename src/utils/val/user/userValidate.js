const validator = require('express-validator')

const userValidator = [
    validator.body("name").exists().isString().notEmpty(),
    validator.body("email").exists().isEmail().notEmpty(),
    validator.body("password").exists().isString().isStrongPassword().notEmpty()
]

module.exports = userValidator