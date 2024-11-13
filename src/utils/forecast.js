const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.weatherstack.com/current?access_key=a4476c63d73de10955c2b54c3372c405&query=' +
    encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);

    // const url = 'https://api.weatherstack.com/current?access_key=a4476c63d73de10955c2b54c3372c405&query=' +
    // '39.47391' + ',' + '-0.375984';

    request({ url, json: true }, (error, response) => {

        if(error) {
            console.log(error);
            callback('An error has occured with weather service', undefined);
        } else if(response && response.body.error) {
            callback('An error has occured: ', undefined);
        } else {   
            const data = response.body; // we don't need now to parse because we set json: true i the request options
            // callback(undefined, data);
            const current = data.current;
            // callback(undefined, currently);
            const formattedData =
            {
                'today_currently': current.weather_descriptions[0] + ' It is currently ' + current.temperature + '°C. There is a humidity of ' +  
                current.humidity + '%',
                'today_humidity_wind': 'The wind speed is: ' +  current.wind_speed + 
                    'km/h with ' +  current.wind_dir + ' direction.'
            }
            
            callback(undefined, formattedData);

        }
    })

}

module.exports = forecast;