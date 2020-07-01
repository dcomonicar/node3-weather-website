const request = require('request')

const  forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c20eb54a703275e284948e8faa8945ca&query='+ encodeURIComponent(longitude) +','+encodeURIComponent(latitude) +'&units=m'
    //   console.log(url)
    request ({ url, json: true}, (error, {body}) => {
            if (error) {
                callback('Unable to connect to weather service!', undefined)
            } else if (body.error) {
                callback('Unable to find location', undefined)
            } else {
                callback(undefined, 
                    body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' out. The humidity is '+body.current.humidity +'.'
                //     weather_description: response.body.current.weather_descriptions[0],
                //     temperature: response.body.current.temperature,
                //     feels_like: response.body.current.feelslike             
                // }
                )
            }
        })
}

module.exports = forecast