function authorizeRole(...role) {
    return (req, res, next) => {
        if(!role.includes(req.decoded.role)) {
            res.status(400).json({message: 'Invalid Credentials'})
        } else {
            next();
        }
    }
}

module.exports = {authorizeRole}