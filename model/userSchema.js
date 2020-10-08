const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {isEmail} = require('validator')
const Schema = mongoose.Schema

const loginSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: {required: true},
        lowercase:true,
        validate: [isEmail, 'Please enter a valid email']
    },
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: {required: true},
        lowercase:true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    date: {
        type: Date,
        default: Date.now,
        default: Date()
    }
}, {timestamps: true})

const RegisteredUsers = mongoose.model('RegisteredUsers', loginSchema)

module.exports = RegisteredUsers