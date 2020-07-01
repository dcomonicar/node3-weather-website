const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dianno Comonicar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Dianno Comonicar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a sample help message.',
        name: 'Dianno Comonicar'
    })
})


app.get('/weather', (req, res) => {
   
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address!'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData, location,
                address: req.query.address

            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            message: 'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        message: 'Help article not found!',
        name: 'Dianno Comonicar',
        title: 'ERROR 404'
    })
})

app.get('*', (req, res) => {
    res.render('error',{
        message: 'ERROR 404: Page not found!',
        name: 'Dianno Comonicar',
        title: 'ERROR 404'
    })

})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})