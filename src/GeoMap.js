const request = require('request');
const getLocationMap = (locationName, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + locationName + '.json?access_token=pk.eyJ1Ijoic2FoaWxraGFyYmFuZGExIiwiYSI6ImNrN3JvN3VycDA3NGkzZXBnZGM3aXg2NGIifQ.eHnWnVA2vDoMnnR6jtr6lg&limit=1';
    const options = {
        url: url,
        method: 'GET'
    };

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services! ', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find the location. Try another location. ', undefined);
        }else{
            callback(undefined, { 
                longitude: response.body.features[0].center[0],
                lattitude: response.body.features[0].center[1],
                location : response.body.features[0].place_name
            });
              
        }
    });
}

module.exports = { getLocationMap: getLocationMap }; 