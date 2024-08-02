const convert = {
    timeCronJob(minute, hour, dayOfMonth, month, dayOfWeek) {
        switch (true) {
            case minute === undefined && hour === undefined && dayOfMonth === undefined && month === undefined && dayOfWeek === undefined:
                return `0 0 * * *`; // Cron will start at 0 hour PM everyday
            case minute !== undefined && hour !== undefined && dayOfMonth === undefined && month === undefined && dayOfWeek === undefined:
                return `${minute} ${hour} * * *`
            case minute !== undefined && hour !== undefined && dayOfMonth !== undefined && month === undefined && dayOfWeek === undefined:
                return `${minute} ${hour} ${dayOfMonth} * *`
            case minute !== undefined && hour !== undefined && dayOfMonth !== undefined && month !== undefined && dayOfWeek === undefined:
                return `${minute} ${hour} ${dayOfMonth} ${month} *`
            case minute !== undefined && hour !== undefined && dayOfMonth !== undefined && month !== undefined && dayOfWeek !== undefined:
                return `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`
            default:
                throw new Error('Invalid cron job parameters')
        }
    }
}

export default convert;