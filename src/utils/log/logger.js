const axios = require('axios')
require('dotenv').config()

const webhook_url = process.env.DISCORD_WEBHOOK_URL

const notifyDiscord = (method, url) => {
    const date = new Date()
    const dayCurrent = date.toLocaleDateString('vi')
    const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    
    const message = {
        content: `New visit with method ${method} ${url} - ${dayCurrent} ${time}`
    }

    axios.post(webhook_url, message).then(res => {}).catch(err => {
        console.error(err);
    }) 
}

module.exports = notifyDiscord;