const Model = require('../models/userModel');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwtToken = require('../config/configJwt');
const emailSend = require('../config/configMail');
const userService = require('../service/userService');
const { generateUUIDWithCharacter } = require('../utils/generateUUID');
const dotenv = require('dotenv')
dotenv.config()
const axios = require('axios')

const registerUser = async (req, res) => {
  try {
    const _id = generateUUIDWithCharacter('US');
    const {
      name,
      email,
      password,
      gender,
      phone,
      country,
      address,
      ward,
      district,
      city,
      photo,
    } = req.body;
    const checkEmail = await Model.userModel.findOne({ email });
    if (
      !name ||
      !email ||
      !password ||
      !gender ||
      !phone ||
      !country ||
      !address ||
      !ward ||
      !district ||
      !city
    ) {
      return res.status(400).json({ message: 'Please fill all information' });
    } else if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Email must be a valid email' });
    } else if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: 'Password must be strong' });
    } else if (checkEmail) {
      return res.status(400).json({ message: 'This email already exists' });
    } else {
      const saltRound = 12;
      const salt = await bcrypt.genSalt(saltRound);
      const passwordHash = await bcrypt.hash(password, salt);
      const sendEmail = emailSend.send(email, name);
      if (sendEmail) {
        const newUser = {
          _id: _id,
          name: name,
          email: email,
          password: passwordHash,
          gender: gender,
          phone: phone,
          country: country,
          address: address,
          ward: ward,
          district: district,
          city: city,
          photo: photo,
        };
        const result = await Model.userModel.create(newUser);
        if (result) {
          return res
            .status(201)
            .json({
              message:
                'Register Successfull - Please check your mail to verify',
              user: newUser,
            });
        } else {
          return res.status(400).json({ message: 'Register Failed' });
        }
      } else {
        return res.status(400).json({ message: 'Email must be valid' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};

const getAllUser = async (req, res) => {
  try {
    const result = await userService.findAll();
    if (result) {
      return res
        .status(200)
        .json({ message: 'Get all user successfull', user: result });
    } else {
      return res.status(400).json({ message: 'Get all user failed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};

const getIdUser = async (req, res) => {
  try {
    const _id = req.params._id;
    const result = await userService.findUserById(_id);
    if (result) {
      return res
        .status(200)
        .json({ message: 'Get user sucessfull', user: result });
    } else {
      return res.status(400).json({ message: 'Get user failed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};

const emailVerifyUser = async (req, res) => {
  const email = req.decoded.email;
  const captchaToken = req.body.captchaToken

  const secret = process.env.APP_SITE_KEY_reCAPTCHA

  if(!email || !captchaToken) {
    return res.status(400).json({message: 'Invalid token, email, or CAPTCHA not provide'})
  }

  try { 
    const captchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captchaToken}`)

    if(!captchaResponse.data.success) {
      return res.status(400).json({success: false ,message: 'Captcha vertification failed'})
    }

    const user = { email: email };
    const newValues = { active: 1 };
    const result = await Model.userModel.findOneAndUpdate(user, newValues, {new: true}).select('-_id -name -gender -phone -country -address -ward -district -city -photo -role');
    if (result) {
      return res.status(200).json({success: true, message: 'Confirmed Mail Successfull', confirmed: result });
    } else {
      return res.status(400).json({ message: 'Confirmed Mail Failed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const findUser = await userService.findEmailUser(email);
    if (!email || !password) {
      res.status(400).json({ message: 'Please type email and password' });
    } else if (!validator.isEmail(email)) {
      res.status(400).json({ message: 'Email must be a valid email' });
    } else if (!validator.isStrongPassword(password)) {
      res.status(400).json({ message: 'Password must be strong' });
    } else if (!findUser) {
      res.status(400).json({ message: 'This email is not exist' });
    } else {
      const _id = findUser._id;
      const role = findUser.role;
      const matchPassword = await bcrypt.compare(password, findUser.password);
      if (matchPassword) {
        if (findUser.active === 1) {
          const token = jwtToken.generatedToken(_id, role);
          res.status(200).json({success: true, message: 'Login Successfull', token: token });
        } else {
          res.status(400).json({ message: 'This email does not verify' });
        }
      } else {
        res.status(400).json({ message: 'Wrong Password' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};

const checkToken = async (req, res) => {
  try {
    const token = req.headers['auth-token-bearer'];
    if (!token) {
      return res.status(400).json({ message: 'Token is ExpiresIn' });
    } else {
      return res.status(200).json({ message: 'Token is valid' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};

const updateProfileUser = async (req, res) => {
  try {
    const _id = req.params._id;
    const name = req.body.name;
    const gender = req.body.gender;
    const phone = req.body.phone;
    const address = req.body.address;
    if (!name || !gender || !phone || !address) {
      return res.status(400).json({ message: 'Please fill all information' });
    } else {
      const user = {
        name: name,
        gender: gender,
        phone: phone,
        address: address,
      };
      const result = await userService.update(_id, user);
      if (result) {
        return res
          .status(200)
          .json({ message: 'Update profile successfull', user: result });
      } else {
        return res.status(400).json({ message: 'Update profile failed' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};

const updateRoleForUser = async (req, res) => {
  try {
    const _id = req.params._id;
    const role = req.body.role;
    if (!role) {
      return res.status(400).json({ message: 'Please choose role' });
    } else {
      const user = { role: role };
      const result = await userService.updateRole(_id, user);
      if (result) {
        return res
          .status(200)
          .json({ message: 'Update role sucessfull', user: result });
      } else {
        return res.status(400).json({ message: 'Update role failed' });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};

module.exports = {
  registerUser,
  emailVerifyUser,
  loginUser,
  checkToken,
  getAllUser,
  getIdUser,
  updateProfileUser,
  updateRoleForUser,
};
