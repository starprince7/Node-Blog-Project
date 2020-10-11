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
        unique: true,
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

loginSchema.pre('save', async function(next) {
    const salt =  await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

loginSchema.statics.Login = async function(email, password) {
    console.log('login details from schema', email, '&', password)
    const user = await this.findOne({email})
    if(user) {
        const auth =  await bcrypt.compare(password, user.password)
        if(auth){
            return user
        }
        else {
            throw Error('incorrect password')
        }
    }
    else {
        throw Error('incorrect email')
    }
}

const RegisteredUsers = mongoose.model('RegisteredUsers', loginSchema)

module.exports = RegisteredUsers