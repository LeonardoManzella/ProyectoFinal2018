var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageProcessor = function () {
  function MessageProcessor(onProcessed) {
    _classCallCheck(this, MessageProcessor);

    this.onProcessed = onProcessed;

    this._timeoutId = null;
    this._queue = [];

    this._processed = this._processed.bind(this);
  }

  MessageProcessor.prototype.process = function process(object) {
    if (!object || !(object instanceof Object) || !(object.content instanceof Object) || !(object.content.text instanceof String || typeof object.content.text === 'string')) return false;

    this._queue.push(object);
    this._processNext();

    return true;
  };

  MessageProcessor.prototype.reset = function reset() {
    clearTimeout(this._timeoutId);
    this._timeoutId = null;
    this._queue = [];
  };

  MessageProcessor.prototype._processNext = function _processNext() {
    if (this.isProcessing || !this._queue.length) return;

    this._timeoutId = setTimeout(this._processed, MessageProcessor.typingSpeed(this._queue[0].content.text));
  };

  MessageProcessor.prototype._processed = function _processed() {
    var message = this._queue.shift();

    clearTimeout(this._timeoutId);
    this._timeoutId = null;
    this._processNext();
    this.onProcessed(message);
  };

  MessageProcessor.typingSpeed = function typingSpeed(text) {
    if (!text || Object.prototype.toString.call(text) !== "[object String]") return 0;

    console.log('Inside es folder');

    return 900;
    //return Math.min(Math.max(text.length * MessageProcessor.minTypingSpeed / 10, MessageProcessor.minTypingSpeed), MessageProcessor.maxTypingSpeed);
  };

  _createClass(MessageProcessor, [{
    key: "isProcessing",
    get: function get() {
      return this._timeoutId !== null;
    }
  }], [{
    key: "minTypingSpeed",
    get: function get() {
      return 1000;
    }
  }, {
    key: "maxTypingSpeed",
    get: function get() {
      return 3000;
    }
  }]);

  return MessageProcessor;
}();

export default MessageProcessor;