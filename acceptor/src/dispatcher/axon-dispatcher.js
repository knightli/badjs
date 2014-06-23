/**
 * Created by chriscai on 2014/6/23.
 */



var axon = require('axon'),
    push = axon.socket('push');

push.connect(3001,'localhost');

module.exports = function (req) {

    push.send( (new Date).toISOString() + ' ' + req.query.level + ' ' + req.query.msg + '\n' );

}