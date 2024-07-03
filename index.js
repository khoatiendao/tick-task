const express = require('express')
const app = express();
const bodyParser = require('body-parser')
require('dotenv').config()
const PORT = process.env.PORT || 9443;
const mongooseConnected = require('./src/config/configDatabase');
const boardRoutes = require('./src/routes/boardRoutes')
const departmentRoutes = require('./src/routes/departmentRoutes');
const userRoutes = require('./src/routes/userRoutes');
const positionRoutes = require('./src/routes/positionRoutes')
const memberRoutes = require('./src/routes/memberRoutes')
const boardListRoutes = require('./src/routes/boardListRoutes')
const {swaggerUI, specsDoc} = require('./src/utils/doc/apiDoc')

app.use(express.json());
app.use(bodyParser.json());

// Api document
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specsDoc));

// Api routes
app.use("/api/v1/department", departmentRoutes)
app.use("/api/v1/board", boardRoutes)
app.use("/api/v1/boardList", boardListRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/position", positionRoutes)
app.use("/api/v1/member", memberRoutes)



app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

app.get("/", (req, res) => {
    res.send("Welcome to my To-do App")
})