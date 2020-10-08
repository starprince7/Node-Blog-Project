const RegisteredUsers = require('../model/userSchema')
module.exports.signup_get = (req, res) => {
    res.render('signup')
}

module.exports.signup_post = async (req, res) => {
    const { email, username, password } = req.body

    try{
        const user = await RegisteredUsers.create({ email, username, password })
        console.log('this is the new user', user)
        res.status(201).json({user})
    }
    catch(err) {
        console.log(err)
    }
    res.render('signup')
}


module.exports.login_get = (req, res) => {
    res.render('login')
}

module.exports.login_post = (req, res) => {
    res.render('login')
}