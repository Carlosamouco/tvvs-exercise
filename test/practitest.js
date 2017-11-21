var request = require('request');
var Base64 = require('js-base64').Base64;

const DEVELOPER_EMAIL = "YOUR EMAIL";
const API_TOKEN = "YOUR API TOKEN";
const PROJECT_ID = "YOUR PROJECT ID";

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


