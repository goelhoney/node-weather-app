const request = require('request');

const geocode = (address, callback) => {
    const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZ29lbDg4IiwiYSI6ImNrNmdvOG5yajBicTAzbWs2bDhoeGpkbHMifQ.V1satwqXaX0OWief0iYJLQ&limit=1'

    request({url:mapboxUrl, json:true}, (error, {body} = {}) => {
        if(error){
            callback('could not connect to server', undefined);
        } else if(body.error) {
            callback('Location not found', undefined);
        } else {         
            if(body.features.length > 0)    {
                callback(undefined, {
                    long: body.features[0].center[0],
                    lat: body.features[0].center[1],      
                    location: body.features[0].place_name,      
                });
            } else {
                callback(undefined, 'Location not found');
            }
            
        }
    });
}

module.exports = geocode;