const mongoose = require('mongoose');
require('dotenv').config()
const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

try {
    mongoose.connect(DB_URL + DB_NAME, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("Connected Mongoose Succesfull"));
} catch (error) {
    console.log(error);
}