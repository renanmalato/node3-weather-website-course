const request = require('request')

const geocode = (address, callback) => {

    const url = 'http://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1IjoicmVuYW5tYWxhdG8iLCJhIjoiY2t4YWZ3Y2lrM3ZkYzJvcm54Ym91ZWNqYiJ9.6oAoTE6GJvBItRFskh7whw&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback (undefined, {
                longitude: body.features[0].geometry.coordinates[1],
                latitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].properties.full_address,
            })
        }
    })

}

module.exports = geocode