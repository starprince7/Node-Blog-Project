const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
        default: Date()
    },
    title: String,
    author: String,
    body: String,
    comments: [{ author: String, body: String, date: { type: Date, default: Date.now } }]
}, { timestamps: true })

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog