/**
 * Created by chriscai on 2014/6/23.
 */


var redis = require("redis"),
    client = redis.createClient();

module.exports = function (data) {

    client.publish("badjs", JSON.stringify(data));

}