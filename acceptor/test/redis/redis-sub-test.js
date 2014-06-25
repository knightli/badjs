var redis = require("redis"),
    client = redis.createClient();

client.on("subscribe", function (channel, count) {
    console.log('subscribe start...');
});

client.on("message", function (channel, message) {
    console.log("client1 channel " + channel + ": " + message);
        client.unsubscribe();
        client.end();
});


client.subscribe("badjs");