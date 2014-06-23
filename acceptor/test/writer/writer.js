module.exports = function () {
  'use strict';
  console.log('writer startup');

  var fs = require('fs')
    , axon = require('axon')
    , req = axon.socket('req');

  req.bind(3002,'localhost');

  function write() {
    req.send(function (res) {
      if (res) {
        fs.appendFile('../log/badjs.log', res, function (err) {
          setTimeout(write, 20);
        });
      } else {
        setTimeout(write, 20);
      }
    });
  }
  write();
  
}();