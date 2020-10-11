const jwt = require('jsonwebtoken')


const RegisteredUsers = require('../model/userSchema')

const handleError = (err) => {
    console.log(err.code)
    let errors = { email: '', username: '', password: '' }

    if(err.code === 11000) {
        errors.email = 'This email is already registered!'
    }

    // Signup error handling Both email & password!
    if(err.message.includes('RegisteredUsers validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }

    // Login error handling for Email!
    if(err.message === 'incorrect email') {
        errors.email = 'that email isn\'t registered'
    }

    // Login error handling for Password!
    if(err.message === 'incorrect password') {
        errors.password = 'that password is incorrect'
    }

    return errors
}

const maxAge = 24 * 60 * 60

const createToken = (id) => {
    return jwt.sign({id}, 'secret', {expiresIn: maxAge})
}


module.exports.signup_get = (req, res) => {
    res.render('signup')
}

module.exports.signup_post = async (req, res) => {
    const { email, username, password } = req.body


    try{
        const user = await RegisteredUsers.create({ email, username, password })
        const token = createToken(user._id)
        res.cookie('jwt', token, { maxAge: maxAge * 1000 }) // Converting to miliseconds
        res.status(201).json({user: user._id})
    }
    catch(err) {
        const refinedError = handleError(err)
        console.log(refinedError)
        res.status(400).json({refinedError})
    }
    res.render('signup')
}


module.exports.login_get = (req, res) => {
    res.render('login')
}

module.exports.login_post = async (req, res) => {
    const {email_login, password_login} = req.body

    try{
        const user = await RegisteredUsers.Login(email_login, password_login)
        const token = createToken(user._id)
        res.cookie('jwt', token)
        res.status(200).json({user: user._id})
    }
    catch (error) {
        console.log('error mesage from catch',error.message)
        const refinedError = handleError(error)
        console.log(refinedError)
        res.status(400).json({refinedError})
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
    res.redirect('/login')
}