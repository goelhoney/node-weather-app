const request = require('request');

const forecast = ({lat, long, location}, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2bae58449dd040dfdbff6dc5444af502&query='+lat+','+long+'&units=f';

    request({url, json:true}, (error, {body}={}) => {
        if(error){
            callback('could not connect to server', undefined);
        } else if(body.error) {
            callback('Location not found', undefined);
        } else {
            callback(undefined, 'Location is '+location+'. It is currently temperature '+body.current.temperature+' degrees outside. It feels like '+body.current.feelslike+' degrees out');
        }
    });
}

module.exports = forecast;



