var exports = module.exports = {};
var request = require('request');
var querystring = require('querystring');
var myJSONObject = {
    "securities": [
        "AAPL US Equity"
    ],
    "fields": [
        "LAST_PRICE"
    ]
};




var exports.req = request(

{
    url: 'http://localhost:3000/request?ns=blp&service=refdata&type=ReferenceDataRequest', //URL to hit
    method: 'POST', 
    json: true,
    body: myJSONObject
    
}, function(error, response, body){
    if(error) {
        console.log(error);
        console.log("You have an error.");
        return("Error.");
    } else {
        console.log(response.statusCode);
        console.log(JSON.stringify(body));
        return("You did something");
    }
}



);