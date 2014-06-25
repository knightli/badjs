module.exports = function () {
  'use strict';
  console.log('accpeter startup');

  var connect = require('connect'),
      ua = require('user-agent-parser'),
      chain = require('./chain/chain'),
      //dispatcher = require('./dispatcher/axon-dispatcher');
      dispatcher = require('./dispatcher/redis-dispatcher');


  chain.init();

  var app = connect()
              .use('/badjs', connect.query())
              .use('/badjs', function (req, res) {
                // parse user agent
                // console.log(ua(req.headers['user-agent']));

                var data = {};
                chain.chain(req , data);
                dispatcher(data);
                //push.send( (new Date).toISOString() + ' ' + req.query.level + ' ' + req.query.msg + '\n' );

                res.writeHead(204, { 'Content-Type': 'image/jpeg' });
                res.statusCode = 204;
                res.end();

              }).listen(3000);

}();