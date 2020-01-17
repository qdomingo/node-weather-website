const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/22e70fafecd5428ea10715d2f3aaac02/' +
    encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si';

    request({ url, json: true }, (error, response) => {

        if(error) {
            callback('An error has occured with weather service', undefined);
        } else if(response && response.body.error) {
            callback('An error has occured: ', undefined);
        } else {   
            const data = response.body; // we don't need now to parse because we set json: true i the request options
            // callback(undefined, data);
            const currently = data.currently;
            // callback(undefined, currently);
            const formattedData =data.daily.data[0].summary + ' It is currently ' + currently.temperature + ' degrees out. There is a ' +  
                currently.precipProbability + '% chance of rain.';
            callback(undefined, formattedData);

        }
    })

}

module.exports = forecast;