const stream = require('streamx')

exports.pipeline = stream.pipeline

exports.Readable = class Readable extends stream.Readable {
  constructor (opts = {}) {
    super({ ...opts, mapReadable: map })

    if (this._construct) this._open = this._construct

    if (this._read !== stream.Readable.prototype._read) {
      this._read = read.bind(this, this._read)
    }

    if (this._destroy !== stream.Stream.prototype._destroy) {
      this._destroy = destroy.bind(this, this._destroy)
    }
  }

  setEncoding (encoding) {
    this._readableState.map = null

    return super.setEncoding(encoding)
  }
}

exports.Writable = class Writable extends stream.Writable {
  constructor (opts = {}) {
    super({ ...opts, mapWritable: map })

    if (this._construct) this._open = this._construct

    if (this._writev !== stream.Writable.prototype._writev) {
      this._writev = writev.bind(this, this._writev)
    }

    if (this._write !== stream.Writable.prototype._write) {
      this._write = write.bind(this, this._write)
    }

    if (this._destroy !== stream.Stream.prototype._destroy) {
      this._destroy = destroy.bind(this, this._destroy)
    }
  }
}

exports.Duplex = class Duplex extends stream.Duplex {
  constructor (opts = {}) {
    super({ ...opts, map })

    if (this._construct) this._open = this._construct

    if (this._read !== stream.Readable.prototype._read) {
      this._read = read.bind(this, this._read)
    }

    if (this._writev !== stream.Duplex.prototype._writev) {
      this._writev = writev.bind(this, this._writev)
    }

    if (this._write !== stream.Duplex.prototype._write) {
      this._write = write.bind(this, this._write)
    }

    if (this._destroy !== stream.Stream.prototype._destroy) {
      this._destroy = destroy.bind(this, this._destroy)
    }
  }

  setEncoding (encoding) {
    this._readableState.map = null

    return super.setEncoding(encoding)
  }
}

exports.Transform = class Transform extends stream.Transform {
  constructor (opts = {}) {
    super({ ...opts, map })

    if (this._transform !== stream.Transform.prototype._transform) {
      this._transform = transform.bind(this, this._transform)
    }
  }

  setEncoding (encoding) {
    this._readableState.map = null

    return super.setEncoding(encoding)
  }
}

exports.PassThrough = class PassThrough extends exports.Transform {}

function read (read, cb) {
  read.call(this, 65536)

  cb(null)
}

function writev (writev, batch, cb) {
  writev.call(this, batch.map(chunk => ({ chunk, encoding: 'buffer' })), cb)
}

function write (write, data, cb) {
  write.call(this, data, 'buffer', cb)
}

function transform (transform, data, cb) {
  transform.call(this, data, 'buffer', cb)
}

function destroy (destroy, cb) {
  destroy.call(this, stream.getStreamError(this), cb)
}

function map (data) {
  return typeof data === 'string' ? Buffer.from(data) : data
}
