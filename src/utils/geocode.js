
const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZHZhbGRlcmFzIiwiYSI6ImNsZDR5cHl0eTB3eTgzeXJ5enV2Zmt1cnEifQ.vMxjaJO-gGcPDSx3r4zDrQ'

    request({ url, json: true }, (error, response, { features }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (features.length === 0) {
            callback('Unable to find location. Try anothere search.', undefined)
        } else {
            callback(undefined, {
             latitude: features[0].center[1],
             longitude: features[0].center[0],
             location: features[0].place_name
            })
        }
    })
}

module.exports = geocode