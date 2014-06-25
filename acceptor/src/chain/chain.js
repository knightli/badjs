/**
 * Created by chriscai on 2014/6/25.
 */
module.exports = function (){

    var chainArray = [];

    var init = function (){
        setValve(require('./valve/paramers-valve'));
    }

    var chain = function ( req ,  obj){
        for(var i = 0 ; i < chainArray.length ; i++){
            if (chainArray[i]( req , obj) === false) {
                return obj;
            }
        }

        return obj;
    }

    var setValve = function (valve){
        chainArray.push(valve);
    }

    return {
        init : init,
        setValve : setValve,
        chain : chain
    }
}();