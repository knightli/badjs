module.exports = function () {
  'use strict';

  var cluster = require('cluster')
    , workerMap = {}
    , accpeterNum = 0
    , writerNum = 0
    , ACCEPTER_NUM = 2;

  if (cluster.isMaster) {
    for (var i = ACCEPTER_NUM ; i--;) {
      cluster.fork({ type: 'accpeter' });
    }
    cluster.fork({ type: 'writer' });

    cluster.on('exit', function (worker) {
      console.log(worker.process.env.type + worker.id + ' died :(');
      if (worker.process.env.type === 'accpeter') {
        accpeterNum--;
        process.nextTick(function () {
          cluster.fork({ type: 'accpeter' });
        });
      } else {
        writerNum++
        process.nextTick(function () {
          cluster.fork({ type: 'writer' });
        });
      }
    });
  } else {
    if (cluster.worker.process.env.type === 'accpeter') {
      require('./../src/accpeter');
      require('./buffer/buffer');
    } else {
      require('./writer/writer');
    }
  }

}();