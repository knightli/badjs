var axon = require('axon')
  , pull = axon.socket('pull')
  , rep = axon.socket('rep')
  , BufferPush = require('./buffer-array')
  // create a push buffer
  , buffer = new BufferPush(100000);

pull.bind(3001,'localhost');

pull.on('message', function (msg) {
  buffer.push(msg);
});

rep.connect(3002,'localhost');

rep.on('message', function (reply) {
  reply(buffer.toString());
  buffer.length = 0;
});