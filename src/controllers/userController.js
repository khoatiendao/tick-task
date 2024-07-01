const Model = require('../models/userModel')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwtToken = require('../config/configJwt')
const emailSend = require('../config/configMail')
const userService = require('../service/userService')
const {generateUUIDWithCharacter} = require('../utils/generateUUID')


const registerUser = async (req, res) => {
    try {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const gender = req.body.gender
        const phone = req.body.phone
        const address = req.body.address
        const role = req.body.role
        const _id = generateUUIDWithCharacter('US')
        const checkEmail = await Model.userModel.findOne({ email });
        if (!name || !email || !password || !gender || !phone || !address || !role) {
            return res.status(400).json({ message: 'Please fill all information' })
        } else if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Email must be a valid email' })
        } else if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: 'Password must be strong' })
        } else if (checkEmail) {
            return res.status(400).json({ message: 'This email already exists' })
        } else {
            const saltRound = 12;
            const salt = await bcrypt.genSalt(saltRound);
            const passwordHash = await bcrypt.hash(password, salt);
            const sendEmail = emailSend.send(email, name)
            if (sendEmail) {
                const newUser = { _id: _id, name: name, email: email, password: passwordHash, gender: gender, phone: phone, address: address, active: 0, role: role }
                const result = await Model.userModel.create(newUser);
                if (result) {
                    return res.status(201).json({ message: 'Register Successfull - Please check your mail to verify', user: newUser})
                } else {
                    return res.status(400).json({ message: 'Register Failed' })
                }
            } else {
                return res.status(400).json({ message: 'Email must be valid' })
            }
        }
    } catch (error) {
        res.status(500)
        console.log(error);
    }
}

const emailVerifyUser = async (req, res) => {
    const email = req.decoded.email;
    try {
        const user = { email: email }
        const newValues = { active: 1 }
        const result = await Model.userModel.findOneAndUpdate(user, newValues, { new: true });
        if (result) {
            return res.status(200).json({ message: 'Confirmed Mail Successfull', confirmed: result })
        } else {
            return res.status(400).json({ message: 'Confirmed Mail Failed' })
        }
    } catch (error) {
        res.status(500)
        console.log(error)
    }
};

const loginUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const findUser = await userService.findEmailUser(email);
        const _id = findUser._id;
        const role = findUser.role;
        if (!email || !password) {
            res.status(400).json({ message: 'Please type email and password' })
        } else if (!findUser) {
            res.status(400).json({ message: 'This email is not exist' })
        } else {
            const matchPassword = await bcrypt.compare(password, findUser.password)
            if(matchPassword) {
                if(findUser.active === 1 ) {
                    const token = jwtToken.generatedToken(_id, role);
                    res.status(200).json({message: 'Login Successfull', token: token})
                } else {
                    res.status(400).json({message: 'This email does not verify'})
                }
            } else {
                res.status(400).json({message: 'Wrong Password'})
            }
        }
    } catch (error) {
        res.status(500)
        console.log(error)
    }
}

const checkToken = async(req, res) => {
    try {
        const token = req.headers['auth-token-bearer'];
        if(!token) {
            return res.status(400).json({message: 'Token is ExpiresIn'})
        } else {
            return res.status(200).json({message: 'Token is valid'})
        }
    } catch (error) {
        res.status(500)
        console.log(error)
    }

}

module.exports = { registerUser, emailVerifyUser, loginUser, checkToken }