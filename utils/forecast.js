const request = require('request')




const forecast = (longitude, latitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=8dc601fcaee1b14e247307546bbe36a3&query=' + longitude + ',' + latitude + '&units=f'
    request ({url, json: true}, (error, { body }) => {

        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
           callback( 'Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out ' + body.current.humidity + ' humidity' + '%')  
            console.log(body)
        }   
    
    })
}




module.exports = forecast