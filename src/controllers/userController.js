const Model = require('../models/userModel');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwtToken = require('../config/configJwt');
const emailSend = require('../config/configMail');
const userService = require('../service/userService');
const { generateUUIDWithCharacter } = require('../utils/generateUUID');
const dotenv = require('dotenv')
dotenv.config()
const axios = require('axios');
const errorResponse = require('../helpers/errorResponse');

const registerUser = async (req, res) => {
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
    throw new errorResponse(400, 'Please fill all information')
  } else if (!validator.isEmail(email)) {
    throw new errorResponse(400, 'Email must be a valid email')
  } else if (!validator.isStrongPassword(password)) {
    throw new errorResponse(400, 'Password must be strong')
  } else if (checkEmail) {
    throw new errorResponse(400, 'This email already exists')
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
        return res.status(201).json({message: 'Register Successfull - Please check your mail to verify', user: newUser});
      } else {
        throw new errorResponse(400, 'Register Failed')
      }
    } else {
      throw new errorResponse(400, 'Email must be valid')
    }
  }
};

const getAllUser = async (req, res) => {
  const result = await userService.findAll();
  if (result) {
    return res.status(200).json({ message: 'Get all user successfull', user: result });
  } else {
    throw new errorResponse(400, 'Get all user failed')
  }
};

const getIdUser = async (req, res) => {
  const _id = req.params._id;
  const result = await userService.findUserById(_id);
  if (result) {
    return res.status(200).json({ message: 'Get user sucessfull', user: result });
  } else {
    throw new errorResponse(400, 'Get user failed')
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
  const email = req.body.email;
  const password = req.body.password;
  const findUser = await userService.findEmailUser(email);
  if (!email || !password) {
    throw new errorResponse(400, "Please type email and password")
  } else if (!validator.isEmail(email)) {
    throw new errorResponse(400, "Email must be a valid email")
  } else if (!validator.isStrongPassword(password)) {
    throw new errorResponse(400, "Password must be strong")
  } else if (!findUser) {
    throw new errorResponse(400, "This email is not exist")
  } else {
    const _id = findUser._id;
    const role = findUser.role;
    const matchPassword = await bcrypt.compare(password, findUser.password);
    if (matchPassword) {
      if (findUser.active === 1) {
        const token = jwtToken.generatedToken(_id, role);
        res.status(200).json({success: true, message: 'Login Successfull', token: token });
      } else {
        throw new errorResponse(400, "This email does not verify")
      }
    } else {
      throw new errorResponse(400, "Wrong Password")
    }
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
  const _id = req.params._id;
  const name = req.body.name;
  const gender = req.body.gender;
  const phone = req.body.phone;
  const address = req.body.address;
  const district = req.body.district;
  const ward = req.body.ward;
  const city = req.body.city;
  if (!name || !gender || !phone || !address || !district || !ward || !city) {
    throw new errorResponse(400, 'Please fill all information')
  } else {
    const user = {
      name: name,
      gender: gender,
      phone: phone,
      address: address,
      country: country,
      district: district,
      ward: ward,
      city: city
    };
    const result = await userService.update(_id, user);
    if (result) {
      return res.status(200).json({ message: 'Update profile successfull', user: result });
    } else {
      throw new errorResponse(400, 'Update profile failed')
    }
  }
};

const updateRoleForUser = async (req, res) => {
  const _id = req.params._id;
  const role = req.body.role;
  if (!role) {
    throw new errorResponse(400, 'Please choose role')
  } else {
    const user = { role: role };
    const result = await userService.updateRole(_id, user);
    if (result) {
      return res.status(200).json({ message: 'Update role sucessfull', user: result });
    } else {
      throw new errorResponse(400, 'Update role failed')
    }
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
