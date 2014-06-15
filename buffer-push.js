/*!
 * BufferPush
 * Copyright(c) 2014 Daniel Yang
 * Copyright(c) 2014 QQEDU
 */
!function () {
  'use strict';
  
  /**
   * BufferPush
   * @class
   * @param {Number} size
   */
  function BufferPush(size) {
    // the actual buffer
    this.buf = new Buffer(size || 1024);
    // the data length of buffer's storage
    this.length = 0;
    Object.defineProperty(this, 'size', {
      'get': function () {
        return this.buf.length;
      }
    });
  }

  /**
   * push
   * @param {String} string
   */
  BufferPush.prototype.push = function (string) {
    if (string.length) {
      var l = Buffer.byteLength(string);
      this.buf.write(string, this.length, l);
      this.length += l;
    }
  }

  /**
   * toString
   * @returns {Stirng}
   */
  BufferPush.prototype.toString = function () {
    return this.buf.toString('utf8', 0, this.length);
  }

  module.exports = BufferPush;

}();