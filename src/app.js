const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000


// Define paths for Express Config.
const viewsPath = path.join(__dirname, '../templates/views')
const PublicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location.
app.set('view engine', 'hbs') //tell express which template extension to use(hbs here)
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to search.
app.use(express.static(PublicDirectoryPath))


// for homepage
app.get('/', (req,res) => {
    res.render('index', {
        title: 'weather',
        name: 'Chirag Sharma'        
    })
})

// for about page
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'about ME',
        name: 'Chirag Sharma'
    })
})

// for help page
app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Tell us if you need some help',
        name: 'Chirag Sharma'
    })
})



// create two more html files for about and help wid tiles showing in browser


app.get('/weather',(req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geoCode(req.query.address,(error,{ latitude,longitude, location } = {}) => {
        if(error) {
            return res.send({ error })

        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error }) //shorthand
            }


            res.send({
                forecast: forecastData,
                location, //shorthand
                address: req.query.address

            })
        })
    })
    // res.send({
    //     forecast: '27 degrees',
    //     location: 'Raipur',
    //     address: req.query.address
    // })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chirag Sharma',
        errorMsg: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chirag Sharma',
        errorMsg: 'page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up! on port ' + port)
    
})
