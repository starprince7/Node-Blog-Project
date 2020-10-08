const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./model/blogSchema')
const router = require('./routes/blogroutes')
const authRouter = require('./routes/authRoutes')

const app = express();

//use Middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

//Register view engine
app.set('view engine', 'ejs')

// db connection 
const dbURI = 'mongodb+srv://starprince:starprince7@starprince.m9v4i.mongodb.net/Projects?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, autoIndex: true })
    .then(result => {
        console.log('Connected to the Database!...')
        app.listen(4000, () => {
            console.log('Server is live on port 4000')
        })
    })
    .catch(err => {
        console.log(err)
    })


//===========Routes=================
app.get('/', async (req, res) => {

    try {
        const blogs = await Blog.find()
        res.render('index', { blogs })
    }
    catch (err) {
        console.log(err)
    }
})


app.get('/about', (req, res) => {
    res.render('about')
})



app.use(router)
app.use(authRouter)



