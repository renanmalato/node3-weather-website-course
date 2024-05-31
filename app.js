
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const address = process.argv[2]

if (!address) {
    console.log('Please provide an address')
} else {

        geocode(address, (error, { latitude, longitude, location } = {} ) => {

            if (error) {
                return console.log('Error', error)
            } 

            forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return console.log('Error', error)

                }
                console.log(location)
                console.log(forecastData)
            })

        })

}