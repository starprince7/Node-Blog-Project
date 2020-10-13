const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./model/blogSchema')
const router = require('./routes/blogroutes')
const authRouter = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const { checkUser } = require('./middlewares/auth')

const app = express();

//use Middleware
app.use(express.static('public'))
app.use('/upload/', express.static('upload'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())   //This is use to parse only json data!
app.use(cookieParser())

//Register view engine
app.set('view engine', 'ejs')

// port 
const port = process.env.PORT || 4000
// db connection 
const dbURI = 'mongodb+srv://starprince:starprince7@starprince.m9v4i.mongodb.net/Projects?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, autoIndex: true })
    .then(result => {
        console.log('Connected to the Database!...')
        app.listen(4000, () => {
            console.log(`Server is live on port ${port}`)
        })
    })
    .catch(err => {
        console.log(err)
    })


//===========Routes=================
app.get('*', checkUser)
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



