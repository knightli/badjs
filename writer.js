module.exports = function () {
  'use strict';
  console.log('writer startup');

  var fs = require('fs')
    , axon = require('axon')
    , req = axon.socket('req');

  req.bind(3001);

  setInterval(function () {
    req.send(function (res) {
      if (res) {
        fs.appendFile('./badjs.log', res);
      }
    });
  }, 5000);
  
}();