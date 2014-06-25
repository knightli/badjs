/**
 * test result(ms) : 400 request/sec
 *
 * test 1000:286
 * test 10000:2857
 * test 20000:5785
 * test 50000:14445
 *
 * @type {exports}
 */


var redis = require("redis"),
    msg_count = 0 ,
    startDate = 0,
    flags = [ 0 , 0, 0 , 0];
    client = redis.createClient();

client.on("subscribe", function (channel, count) {
    console.log('subscribe start...');
});

client.on("message", function (channel, message) {
    msg_count ++ ;
    if(startDate === 0 ){
        startDate = Date.now();
    }

    if(msg_count > 1000 && flags[0] === 0){
        console.log(" test 1000:" + (Date.now() - startDate));
        flags[0] =1;
    }

    if(msg_count > 10000 && flags[1] === 0){
        console.log(" test 10000:" + (Date.now() - startDate));
        flags[1] =1;
    }

    if(msg_count > 20000 && flags[2] === 0){
        console.log(" test 20000:" + (Date.now() - startDate));
        flags[2] =1;
    }


    if(msg_count >= 50000 && flags[3] === 0){
        console.log(" test 50000:" + (Date.now() - startDate));
        flags[3] =1;
        client.unsubscribe();
        client.end();
    }

});


client.subscribe("badjs");