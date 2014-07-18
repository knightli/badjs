/**
 *  @info: route
 *  @author: chriscai
 *  @date: 2014-7-7
 */



module.exports = function (app) {


    app.get('/:_path', function (req , res) {
        res.render(req.params._path );
    });


    app.get('/', function (req , res) {
        res.render('index.html'  );
    });

};

