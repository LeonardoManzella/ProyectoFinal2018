'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTransitionGroup = require('react-transition-group');

var _Animatable = require('./../../Animatable');

var _Animatable2 = _interopRequireDefault(_Animatable);

var _Text = require('./content/Text');

var _Text2 = _interopRequireDefault(_Text);

var _Typing = require('./content/Typing');

var _Typing2 = _interopRequireDefault(_Typing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Message = function (_Component) {
  _inherits(Message, _Component);

  function Message() {
    _classCallCheck(this, Message);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  var messagesHeight = 0;

  Message.prototype.render = function render() {
    
    var hasText = this.props.content && this.props.content.text;

    if (hasText) {

      if(this.props.content.text == '###REMOVE_ME###'){
        return '';
      }
      
    }

    if (hasText && messagesHeight == 0) {

      var total = $(".I-ChatBot").height();

      var actionBarThreeLines = $(".ActionBar").height() * 3;

      $(".ActionBar").css("max-height", actionBarThreeLines);

      messagesHeight = total - actionBarThreeLines;
      $(".Messages").height(messagesHeight);
    
      $("body").css("overflow-y", "hidden");
    }

    var _this2 = this;

    var className = 'Message ' + (this.props.isInbound ? 'Inbound' : 'Outbound');
    var content = function () {
      switch (_this2.props.type) {
        case 'text':
          return _react2.default.createElement(_Text2.default, _this2.props.content);

        case 'typing':
          return _react2.default.createElement(_Typing2.default, null);
      }
    }();

    return _react2.default.createElement(
      _reactTransitionGroup.TransitionGroup,
      { component: 'li', className: className },
      _react2.default.createElement(
        _Animatable2.default,
        { classNames: 'Message-Content' },
        _react2.default.createElement(
          'div',
          { className: 'Message-Animatable-Container' },
          _react2.default.createElement(
            'div',
            { className: 'Message-Content' },
            content
          )
        )
      )
    );
  };

  return Message;
}(_react.Component);

Message.propTypes = process.env.NODE_ENV !== "production" ? {
  type: _propTypes2.default.oneOf(['text', 'typing']).isRequired,
  content: _propTypes2.default.object,
  isInbound: _propTypes2.default.bool.isRequired
} : {};

exports.default = Message;
module.exports = exports['default'];