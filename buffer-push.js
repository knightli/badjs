function BufferPush(size) {
  this.buf = new Buffer(size || 1024);
  this._pushOffset = 0;
}

BufferPush.prototype.push = function (string) {
  if (string.length) {
    var l = Buffer.byteLength(string);
    this.buf.write(string, this._pushOffset, l);
    this._pushOffset += l;
  }
}

BufferPush.prototype.toString = function () {
  return this.buf.toString('utf8', 0, this._pushOffset);
}

BufferPush.prototype.reset = function () {
  this._pushOffset = 0;
}

module.exports = BufferPush;