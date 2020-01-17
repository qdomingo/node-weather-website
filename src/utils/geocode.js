const request = require('request');

const geocode = (address, callback) => {

    const url_geo = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + 
        encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZWRvbWluZ28iLCJhIjoiY2s0dHV4eXdmMDEwNjNrbnRhNXJkb3c3ZCJ9.z4J7DgDPrGonKS-kPCLCFw&limit=1';

    request({ url: url_geo, json: true }, (error, { body }) => {

        if(error) {
            callback('An error has occured whith mapbox service', undefined);
        } else if( body.features.length === 0) {
            callback('No location found', undefined);
        } else {  
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, data);
        }
    })
}

module.exports = geocode;