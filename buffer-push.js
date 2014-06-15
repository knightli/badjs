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
    // the buffer offset
    this._offset = 0;
    Object.defineProperties(this, {
      // the data length of buffer's storage
      'length': {
        get: function () {
          return this._offset
        }
      },
      // the buffer size
      'size': {
        'get': function () {
          return this.buf.length;
        }
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
      this.buf.write(string, this._offset, l);
      this._offset += l;
    }
  }

  /**
   * toString
   * @returns {Stirng}
   */
  BufferPush.prototype.toString = function () {
    return this.buf.toString('utf8', 0, this._offset);
  }

  /**
   * reset
   */
  BufferPush.prototype.reset = function () {
    this._offset = 0;
  }

  module.exports = BufferPush;

}();