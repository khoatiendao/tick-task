const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const { createProxyMiddleware } = require('http-proxy-middleware');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config()
const PORT = process.env.PORT || 9443;
const {swaggerUI, specsDoc} = require('./src/utils/doc/apiDoc')
const logger = require('./src/middleware/logHandle');
// const socketIo = require('socket.io')

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, OPTIONS, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,auth-token-bearer");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("optionsSucessStatus", 200)
    next()
});

// Rate limit
app.use(rateLimit({
  windowMs: 10 * 60 * 1000, // 10 phút
  max: 1000
}));

app.use(logger)
// Api document
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specsDoc));

// Routing: map prefix route → service URL
const routes = {
  "/api/v1/user": "http://localhost:3001",
  "/api/v1/taskList": "http://localhost:3002",
  "/api/v1/department": "http://localhost:3003",
  "/api/v1/board": "http://localhost:3004",
  "/api/v1/boardList": "http://localhost:3005",
  "/api/v1/position": "http://localhost:3006",
  "/api/v1/member": "http://localhost:3007",
  "/api/v1/taskAssignment": "http://localhost:3008",
  "/api/v1/admin/dashboard/user": "http://localhost:3010",
  "/api/v1/admin/dashboard/task": "http://localhost:3011",
  "/api/v1/cron": "http://localhost:3012",
};

// Apply proxy middleware cho từng prefix
Object.entries(routes).forEach(([path, target]) => {
  app.use(path, createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: (pathReq) => pathReq.replace(path, '') || '/', // giữ route gốc trong service
    logLevel: 'silent',
  }));
});

// Health check
app.get("/", (req, res) => res.send("🌐 API Gateway is running!"));
app.get("/healthz", (req, res) => res.status(200).send("ok"));

app.listen(PORT, () => {
  console.log(`🚀 API Gateway is running on port ${PORT}`);
});

// Use Socket
// const io = socketIo(io)
// io.on('connection', (socket) => {
//     console.log('New Client connected');
// })