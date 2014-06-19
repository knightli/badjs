module.exports = function () {
  'use strict';
  console.log('accpeter startup');

  var connect = require('connect')
    , ua = require('user-agent-parser')
    , axon = require('axon')
    , push = axon.socket('push');

  push.connect(3001);

  var app = connect()
              .use('/badjs', connect.query())
              .use('/badjs', function (req, res) {
                // parse user agent
                // console.log(ua(req.headers['user-agent']));

                push.send(+new Date + ' ' + req.query.level + ' ' + req.query.msg + '\n');

                res.writeHead(204, { 'Content-Type': 'image/jpeg' });
                res.statusCode = 204;
                res.end();
              }).listen(3000);

}();