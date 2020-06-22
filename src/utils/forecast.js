const request = require('request');


const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=a71b6a43a2c906a8d54cd52cb9f982a4&query=${latitude},${longitude}`;

    request({url, json: true}, (error, {body})=> {
            if(error) {
                callback('Unable to connect to weather API');
            }else if(body.error){
                callback('Unable to find location');
            } else{
                callback(undefined,`${body.current.weather_descriptions[0]}.It's ${body.current.temperature} degress out. It's feels like ${body.current.feelslike} degress out. It's ${body.current.cloudcover}% cloudcover.`);
            }
        
        })

}

module.exports = forecast;
