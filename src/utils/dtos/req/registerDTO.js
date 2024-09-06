class userRegisterDTO {
    name;
    email;
    password;
    phone
    constructor(req) {
        this.name = req.name
        this.email = req.email
        this.password = req.password
        this.phone = req.phone
    }
}

