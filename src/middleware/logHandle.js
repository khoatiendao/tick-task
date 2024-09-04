const notifyDiscord = require("../utils/log/logger");

const logger = (req, res, next) => {
    const date = new Date()
    const dayCurrent = date.toLocaleDateString('vi')
    const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const visit = `New visit with method ${req.method} ${req.url} - ${dayCurrent} ${time}`
    console.log(visit);
    notifyDiscord(req.method, req.url)
    next()
}

module.exports = logger;