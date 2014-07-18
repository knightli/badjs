/**
 *  @info: app
 *  @author: chriacai
 *  @date: 2014-7-7
 */

var express = require('express');

var app = express();





// supporting JSON
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser('abcder'))
app.use(express.session({secret:'abcder',store: new express.session.MemoryStore() , cookie : {path : '/' }}));


app.engine('html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(express.favicon(__dirname + '/views/favicon.ico', { maxAge: 2592000000 }));
app.use('/css/' , express.static(__dirname + '/views/css'));
app.use('/img/' , express.static(__dirname + '/views/img'));
app.use('/js/' , express.static(__dirname + '/views/js'));


var arguments = process.argv.splice(2);



app.use(function (req , res , next){
    req.actrulUrl = req.protocol + "://" + req.get('host') + req.url;
    req.indexUrl = req.protocol + "://" + req.get('host') + '/index.html';
    next();
});






app.use(function (error , req , res , next){
    if(error){
        console.log(error);
        res.json({ec : 1, em : error});
    }else {
        next();
    }

});

require('./src/routes/Index.js')(app);

console.log('listener 8080...')
app.listen(8080);

