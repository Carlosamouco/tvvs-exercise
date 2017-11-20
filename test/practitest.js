var request = require('request');
var Base64 = require('js-base64').Base64;

const DEVELOPER_EMAIL = "rafavieira.93@gmail.com";
const API_TOKEN = "1711b8261ce01c4c82d0f9587360a9f9950174c2";
const PROJECT_ID = "7268";

var json = {
  "data": { 
    "attributes": { 
        "instance-id" : "7539908", 
        "exit-code" : "1" 
    } 
  }   
};

function postData(json) {
  var options = {
    url: `https://api.practitest.com/api/v2/projects/${PROJECT_ID}/runs.json`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Base64.encode(DEVELOPER_EMAIL + ":" + API_TOKEN)}`
    },
    json: json
  };
  
  request(options, function(err, res, body) {
    if (res && (res.statusCode === 200 || res.statusCode === 201)) {
        console.log('SUCCESS: ', body);
    }
    else {
        console.log('ERROR: ', body);
    }
  });
}

module.exports = postData;


