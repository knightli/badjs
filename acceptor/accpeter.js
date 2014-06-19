module.exports = function () {
  'use strict';
  console.log('accpeter startup');

  var connect = require('connect')
    , ua = require('user-agent-parser')
    , axon = require('axon')
    , rep = axon.socket('rep')
    , BufferPush = require('./buffer-push')
    // create a push buffer
    , buffer = new BufferPush(100000);

  rep.connect(9999);

  rep.on('message', function (reply) {
    reply(buffer.toString());
    buffer.length = 0;
  });

  var app = connect()
              .use('/badjs', connect.query())
              .use('/badjs', function (req, res) {
                // parse user agent
                // console.log(ua(req.headers['user-agent']));

                buffer.push(+new Date + ' ' + req.query.level + ' ' + req.query.msg + '\n');

                res.writeHead(204, { 'Content-Type': 'image/jpeg' });
                res.statusCode = 204;
                res.end();
              }).listen(3000);

}();