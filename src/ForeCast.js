const request = require('request');
getForeCast = (lattitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/066285b2dab641e919df85c1d6aff7ee/'+lattitude+','+ longitude +'';
    const options = {
        url: url,
        method: 'GET'
    };
    
    request({url,json:true},(error,response) =>{
        if(error){
            callback('Unable to connect to weather services .',undefined);
        }else if(response.body.error){
            console.log(response.body.error);
            callback('Unable to find location. ',response);
        }else{
            callback(undefined, response.body.currently.summary + ' .It is currently '+ response.body.currently.temperature + ' degrees out. There is a ' + 'chance of rain.')
        }
    });
}

module.exports = {getForeCast:getForeCast};

