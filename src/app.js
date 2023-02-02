const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')


const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather App',
        contact: 'contacto@mib.cl'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About',
        contact: 'contacto@mib.cl'
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
        products: []
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address
    if (!address) {
        return res.send({ error: 'An address needs to be provided' })
    }

    //console.log('Location: ' + address)
    geocode(address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }

        forecast(latitude,longitude,'m' , (error, bodyForecast) => {
            if (error) {
                return console.log(error)
            }

            res.send({
                forecast: bodyForecast,
                location: location,
                address: address
            })
       
        })

    })

})


// Guide snippet

const address = process.argv[2]

if ( !address ) {
    console.log('Please provide a location name')
    } else {

    console.log('Location: ' + address)
    geocode(address, (error, { latitude, longitude, location}) => {

        if (error) {
            return console.log(error)
        }
        // console.log('Error', error)
        // console.log('Body', body)
        forecast(latitude,longitude,'m' , (error, bodyForecast) => {
            if (error) {
                return console.log(error)
            }

            console.log('Error', error)
            console.log('Body', bodyForecast)
            console.log(location)
        
        })

    })
}

//



app.get('/help',(req, res) => {
    res.render('help', {
        title: 'Help',
        contact: 'contacto@mib.cl'
    })
})

app.get('/help/*',(req, res) => {
    res.render('404', { 
        title: '404', 
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req, res) => {
     res.render('404',{
        title: '404',
         errorMessage: '404 - Page not found'
     })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})