const request = require('request')


// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

// forecast(-75.7088, 44.1545, (error,data) => {
//     console.log('Error', data)
//     console.log('Data', data)
//  })


const forecast = (latitude,longitude,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=a34e9876302f02ea54126c6112c96161&query=' + latitude + ',' + longitude + '&units=m'

    request({url: url,json: true},(error,{ body }) => {
        if(error){
            callback('Unable to connect to weather services', undefined)

        }else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
           callback(undefined, "It feels like " + body.current.feelslike + " degrees out in " + body.location.name  +  " .It is " + body.current.weather_descriptions[0] + " and like " +  body.current.temperature + " degrees out")
        }
    })
}

module.exports = forecast