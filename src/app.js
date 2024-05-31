const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')

const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()
const port = process.env.PORT || 3001;

//Defina paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Andrew Mead',
        message: 'This is a help message',
    })
})



//Goal: Create two more routes
//1. Setup an about route and render a page title
//2. Setup a weather route and render a page title
//3. Test your work by visiting both in the browser



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provida an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })

        })

    })
    


})



app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
        error: 'You must provide a search term'
       })
    }
    console.log(req.query.search)
    res.send({
        products: [],
    })
})




app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found',
    })
})




app.listen(port, () => {
    console.log('Server is running on port ' + port)
})