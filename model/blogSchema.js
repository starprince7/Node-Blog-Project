const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogSchema = new Schema({
    picture: '',
    date: {
        type: Date,
        default: Date.now,
        default: Date()
    },
    title: {type: String, required: true},
    author: String,
    body: {type: String, required: true},
    link: String,
    comments: [{ author: String, body: {type: String, required: true}, date: { type: Date, default: Date.now } }]
}, { timestamps: true })

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog