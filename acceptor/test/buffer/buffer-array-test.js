var BufferPush = require('./buffer-array')
  , buffer = new BufferPush(1024);

describe('BufferPush', function () {
  it('should able to push & get', function () {
    buffer.push('hello ');
    buffer.push('world!');
    buffer.toString().should.equal('hello world!');
  });

  it('should able to get the buffer current length', function () {
    buffer.length.should.equal(12);
  });

  it('should able to get the buffer size', function () {
    buffer.size.should.equal(1024);
  });

  it('should able to reset the buffer', function () {
    buffer.length = 0;
    buffer.length.should.equal(0);
    buffer.toString().should.equal('');
  });
});