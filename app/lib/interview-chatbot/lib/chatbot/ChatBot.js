'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _MessageProcessor = require('./MessageProcessor');

var _MessageProcessor2 = _interopRequireDefault(_MessageProcessor);

var _ChatBotUtil = require('./ChatBotUtil');

var _ChatBotUtil2 = _interopRequireDefault(_ChatBotUtil);

var _ActionBar = require('./actionbar/ActionBar');

var _ActionBar2 = _interopRequireDefault(_ActionBar);

var _Messages = require('./messages/Messages');

var _Messages2 = _interopRequireDefault(_Messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A `ChatBot` component builds a chat based on messages received from callbacks, handles user interactions and calls callbacks.
 *
 * <ChatBot onGetStarted={onGetStarted} getStartedButton={ChatBotUtil.makeGetStartedButton('Get Started')} />
 */
var ChatBot = function (_Component) {
  _inherits(ChatBot, _Component);

  function ChatBot(props) {
    _classCallCheck(this, ChatBot);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this._onGetStarted = _this._onGetStarted.bind(_this);
    _this._onQuickReplyAction = _this._onQuickReplyAction.bind(_this);
    _this._onTextInputSubmit = _this._onTextInputSubmit.bind(_this);
    _this._onProcessed = _this._onProcessed.bind(_this);

    _this.state = {
      actions: props.getStartedButton ? [props.getStartedButton] : [],
      messages: [],
      messageProcessor: new _MessageProcessor2.default(_this._onProcessed)
    };
    return _this;
  }

  ChatBot.prototype.render = function render() {
    var _this2 = this;

    var messages = this.state.messages.concat(this.state.messageProcessor.isProcessing ? [{
      type: 'typing',
      isInbound: false
    }] : []);

    return _react2.default.createElement(
      'div',
      { className: 'I-ChatBot' },
      _react2.default.createElement(_Messages2.default, { messages: messages }),
      _react2.default.createElement(_ActionBar2.default, {
        actions: this.state.actions.map(function (action) {
          switch (action.type) {
            case 'get-started':
              return Object.assign({}, action, { onAction: _this2._onGetStarted });

            case 'quick-reply':
              return Object.assign({}, action, { onAction: _this2._onQuickReplyAction });

            case 'text-input':
              return Object.assign({}, action, { onSubmit: _this2._onTextInputSubmit });
          }
        }) })
    );
  };

  ChatBot.prototype.startOver = function startOver() {
    var _this3 = this;

    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    this.state.messageProcessor.reset();
    this.setState(function (prevState, props) {
      return {
        actions: props.getStartedButton ? [props.getStartedButton] : [],
        messages: message && !_this3.props.getStartedButton ? [message] : []
      };
    });

    if (!this.props.getStartedButton) {
      this._processNext(this.props.onGetStarted());
    }
  };

  ChatBot.prototype._addMessage = function _addMessage(message) {
    this.setState(function (prevState, props) {
      return {
        actions: message.actions || [],
        messages: prevState.messages.concat(message)
      };
    });
  };

  ChatBot.prototype._onGetStarted = function _onGetStarted(text) {
    this._addMessage(_ChatBotUtil2.default.userTextMessage(text));
    this._processNext(this.props.onGetStarted());
  };

  ChatBot.prototype._onProcessed = function _onProcessed(message) {
    this._addMessage(message);
  };

  ChatBot.prototype._onQuickReplyAction = function _onQuickReplyAction(text, callback) {
    this._addMessage(_ChatBotUtil2.default.userTextMessage(text));
    if (callback) this._processNext(callback());
  };

  ChatBot.prototype._onTextInputSubmit = function _onTextInputSubmit(value, callback) {
    this.setState(function (prevState, props) {
      return {
        actions: []
      };
    });

    var hasValue = value && value.length;
    if (hasValue) this._addMessage(_ChatBotUtil2.default.userTextMessage(value));
    this._processNext(callback(value), hasValue);
  };

  ChatBot.prototype._processNext = function _processNext(next) {
    var _this4 = this;

    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (!next) return;

    setTimeout(function () {
      (Array.isArray(next) ? next : [next]).map(function (message) {
        return _this4.state.messageProcessor.process(message);
      });
      _this4.forceUpdate();
    }, delay ? 500 : 0);
  };

  return ChatBot;
}(_react.Component);

ChatBot.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * A `<ChatBot>` callback fired immediately on mounting if no get started button object passed during initialization, otherwise when `startOver` method is called.
   * Returns an array of chat message objects to display in a chat.
   *
   * @type Function() -> [Object]
   */
  onGetStarted: _propTypes2.default.func.isRequired,

  /**
   * An optional object that describes get start button.
   * Use ChatBotUtil.makeGetStartedButton method for creating an object with button title.
   *
   * @type Object
   */
  getStartedButton: _propTypes2.default.object
} : {};

exports.default = ChatBot;
module.exports = exports['default'];