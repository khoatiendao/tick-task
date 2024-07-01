const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
// const userRoutes = require('')

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation for Project Manage Task Company',
        version: '1.0.0',
      },
    },
    // Đường dẫn đến các file chứa chú thích API
    apis: ['./src/routes/*.js'],
};
console.log(options);

const specsDoc = swaggerJsdoc(options)

module.exports = {swaggerUI, specsDoc}