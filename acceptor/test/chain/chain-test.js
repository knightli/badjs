var assert = require("assert") ,
    chain = require('../../src/chain/chain');


describe('chain', function () {
  it('star', function () {

      var requestMock = {query : {msg : 'test', id: 111}}

      chain.init();

      var obj = {};
      chain.chain(requestMock , obj);


      assert.equal('test' , obj.query.msg);
      assert.equal(111 , obj.query.id);

  });

});