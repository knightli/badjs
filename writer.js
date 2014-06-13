module.exports = function () {
  'use strict';
  console.log('writer startup');

  var axon = require('axon')
    , req = axon.socket('req');

  req.bind(3001);

  setInterval(function () {
    req.send(function (res) {
      console.log(res);
    });
  }, 5000);
  
}();