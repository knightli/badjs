module.exports = function () {
  'use strict';
  console.log('accpeter startup');

  var connect = require('connect')
    , axon = require('axon')
    , rep = axon.socket('rep')
    , buffer = [];

  rep.connect(3001);

  rep.on('message', function (reply) {
    reply(buffer);
    buffer.length = 0;
  });

  function _makeParam(str) {
    var kvs = str.split('&')
      , param = {};
    kvs.forEach(function (kv) {
      kv = kv.split('=');
      param[kv[0]] = kv[1];
    });
    return param;
  }

  var app = connect()
              .use(function (req, res) {
                var begin, param;

                param = (begin = req.url.indexOf('?') + 1) ?
                  _makeParam(req.url.substring(begin)) :
                  {};

                buffer.push(param);

                res.writeHead(204, { 'Content-Type': 'image/jpeg' });
                res.statusCode = 204;
                res.end();
              }).listen(3000);

}();