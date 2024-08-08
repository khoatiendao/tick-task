const convert = {
    timeCronJob(minute, hour, dayOfMonth, month, dayOfWeek) {
        switch (true) {
            case minute === "*" && hour === "*" && dayOfMonth === "*" && month === "*" && dayOfWeek === "*":
                return `* * * * *`;
            case minute !== "*" && hour === "*" && dayOfMonth === "*" && month === "*" && dayOfWeek === "*":
                return `${minute} * * * *`; // Cron will start at 0 hour PM everyday
            case minute !== "*" && hour !== "*" && dayOfMonth === "*" && month === "*" && dayOfWeek === "*":
                return `${minute} ${hour} * * *`
            case minute !== "*" && hour !== "*" && dayOfMonth !== "*" && month === "*" && dayOfWeek === "*":
                return `${minute} ${hour} ${dayOfMonth} * *`
            case minute !== "*" && hour !== "*" && dayOfMonth !== "*" && month !== "*" && dayOfWeek === "*":
                return `${minute} ${hour} ${dayOfMonth} ${month} *`
            case minute !== "*" && hour !== "*" && dayOfMonth !== "*" && month !== "*" && dayOfWeek !== "*":
                return `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`
            default:
                throw new Error('Invalid cron job parameters')
        }
    }
}

module.exports = convert;