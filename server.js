// Step 1 - node review 
const express = require('express')
const bodyParser = require('body-parser')

const usernameCheck = require('./middleware/usernameCheck')
const userCheck = require('./middleware/userCheck')
const session = require('express-session')
require('dotenv').config()
const {SERVER_PORT} = process.env

const app = express()
// Step 3 - App level middleware. 
app.use(bodyParser.json())

app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 400000
    }
}))

app.use(userCheck)

app.post('/api/secure', usernameCheck, (req, res) => {
    res.sendStatus(200)
})
app.use((req, res, next) => {
    if(!req.session.movies) {
        req.session.movies = []
    }
    next()
})
app.post('/api/movies', (req, res) => {
    let {movie} = req.body 
    req.session.movies.push(movie)
    res.sendStatus(200)
})

app.get('/api/movies', (req, res) => {
    res.status(200).send(req.session.movies)
})

app.delete('/api/session', (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
})

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`)
})