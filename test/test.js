var assert = require('assert');
var http = require('http');
var postData = require('./practitest.js');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
        postData({
            "data": { 
              "attributes": { 
                  "instance-id" : "7539908", 
                  "exit-code" : "1" 
              } 
            }   
          });
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});