
const request = require('postman-request');

const forecast = (latitude, longitude, units, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=7dc7827793d5113cb937af7b3ffbf428&query=' + latitude +',' + longitude + '&units=' + units
   
    request({ url, json: true }, (error, response, body) => {

        if (error) {
            callback('Unable to connect to weather service',undefined)
        } else if (body.error) {
            callback('Unable to find location. Try anothere search.', undefined)
        } else {
            callback(undefined, {
                weather_descriptions: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feels_like: body.current.feelslike
            })
        }
        
    })
}

module.exports = forecast



